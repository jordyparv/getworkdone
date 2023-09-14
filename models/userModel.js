import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: false,
    trim: true,
    minlength: 5,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    select: false,
  },
  resetToken: {
    type: String,
    select: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Create the User model
const User = mongoose.model('User', userSchema);

export default User;
