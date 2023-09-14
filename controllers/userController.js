import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import { sendMail } from '../lib/sendMail.js';

import generateRandomUsername from '../utils/getRandomUsername.js';

import generateJWT from '../helpers/generateJWT.js';

import { addUser, getUserByEmail, updateUserToken } from '../helpers/userFn.js';

const resetPasswordTokens = [];

// User registration
export const userRegistration = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (user) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const username = generateRandomUsername();
    const newUser = { email, username, password };
    const { createdUser, token } = await addUser(newUser);

    if (!createdUser) {
      // deepcode ignore JavascriptDeadCode: <please specify a reason of ignoring this>
      return res
        .status(500)
        .json({ error: 'Something went wrong try again later!' });
    }
    const maxAge = 60 * 60 * 24;
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge,
      secure: true,
    });
    res.status(201).json({ message: 'User registered successfully' });
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

    const user = await getUser(email);

    if (!user) {
      return res.status(401).json({ message: 'User not registered' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Email or Password is invalid' });
    }

    const _user = { ...user.toObject() };
    delete _user.password;

    const token = generateJWT(user);

    const maxAge = 60 * 60 * 24;

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge,
    });
    res.json({ user: _user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Forgot password
export const userForgotPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const resetToken = generateJWT(user, '10m');
    const updatedUser = await updateUserToken(email, resetToken);

    if (!updatedUser) {
      return res.status(500).json({ message: 'Unable to reset password' });
    }
    // sendMail(email, resetToken);
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
