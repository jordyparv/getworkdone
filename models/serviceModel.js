import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
      trim: true,
    },
  ],
  createAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  imgURL: {
    type: String,
  },
  imgBase64: {
    type: String,
  },
});

const ServiceCategory = mongoose.model('Service', serviceSchema);

export default ServiceCategory;
