import { validationResult } from 'express-validator';
import { getAllServices, searchServiceByName } from '../helpers/serviceFn.js';
import { sanitizeInput } from '../utils/tools.js';

export const addService = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, description, tags } = req.body;
    const oldCategory = await serviceCategory.findOne({ name });
    if (oldCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }
    const newCategory = new serviceCategory({
      name,
      description,
      tags,
    });
    const savedCategory = await newCategory.save();
    if (savedCategory) {
      res.status(201).json(savedCategory);
    }
  } catch (error) {
    console.error('Error creating category:', error);
    // next(error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const getService = async (req, res, next) => {
  try {
    const service = await getAllServices();
    if (!service) {
      return res.status(404).json({ message: 'No service found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
export const searchService = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name } = req.query;

    const service = await searchServiceByName(sanitizeInput(name));

    if (!service) {
      return res.status(404).json({ message: 'No service found' });
    }
    res.json(service);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
