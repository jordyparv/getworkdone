import mongoose from 'mongoose';

const workMenProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 128,
    trim: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  workType: {
    type: String,
    require: true,
  },
  serviceName: {
    type: String,
    require: true,
    trim: true,
  },
  profileImg: {
    type: String,
  },
  serviceDescription: {
    type: String,
    trim: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const workMenProfileModel = mongoose.model(
  'workMenProfile',
  workMenProfileSchema
);
export default workMenProfileModel;
