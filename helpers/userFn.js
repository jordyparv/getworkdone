import User from '../models/userModel.js';
import generateJWT from './generateJWT.js';

export const getUserByEmail = async (email) => {
  return User.findOne({ email }).select('+password');
};
export const addUser = async (user) => {
  const token = generateJWT(user);
  const createdUser = await User.create(user);
  const _user = { token, createdUser };
  return _user;
};

export const updateUserToken = async (email, resetToken) => {
  return User.findOneAndUpdate({ email }, { resetToken });
};
