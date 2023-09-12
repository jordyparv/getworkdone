import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import { sendMail } from '../lib/sendMail.js';
import User from '../models/userModel.js';
import generateRandomUsername from '../utils/getRandomUsername.js';
import { jwtSecretKey } from '../config/constants.js';

const resetPasswordTokens = [];

// User registration
export const userRegistration = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const username = await generateRandomUsername();
    const { email, password } = req.body;
    const _user = await User.findOne({ email });
    if (!!_user) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const newUser = { email, username, password };
    const createdUser = await User.create(newUser);
    if (createdUser) {
      res.status(201).json({ message: 'User registered successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const userLogin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Email or Password is invalid' });
    }
    const _user = { ...user.toObject() };
    delete _user.password;
    delete _user.updatedAt;
    const userBase64 = user.username.concat(user.email).toString('base64');
    const token = jwt.sign({ userBase64 }, jwtSecretKey, { expiresIn: '1D' });

    res.json({ user: _user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Forgot password
export const userForgotPassword = (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;
    const user = User.find((user) => user.email === email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = jwt.sign({ email }, jwtSecretKey, { expiresIn: '1h' });
    resetPasswordTokens.push(resetToken);

    sendMail(email, resetToken);

    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Reset password

export const userResetPassword = (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, resetToken, newPassword } = req.body;

    if (!resetPasswordTokens.includes(resetToken)) {
      return res.status(400).json({ message: 'Invalid reset token' });
    }

    const user = User.find((user) => user.email === email);
    if (user) {
      user.password = bcrypt.hashSync(newPassword, 10);
    }

    resetPasswordTokens.splice(resetPasswordTokens.indexOf(resetToken), 1);

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
