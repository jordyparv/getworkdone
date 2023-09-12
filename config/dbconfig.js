import mongoose from 'mongoose';
import { mongoURI } from './constants.js';
// Define your MongoDB connection URI

// Create a function to establish the database connection
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1); // Exit the application if the connection fails
  }
};

export default connectDB;
