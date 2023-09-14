import ServiceCategory from '../models/serviceModel.js';
export const searchServiceByName = (name) => {
  const regex = new RegExp(name, 'i');
  const service = ServiceCategory.find({
    $or: [{ name: regex }, { description: regex }],
  });

  return service;
};
export const getAllServices = () => ServiceCategory.find();
