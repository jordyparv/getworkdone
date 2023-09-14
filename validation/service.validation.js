import { checkSchema } from 'express-validator';

const categorySchema = checkSchema({
  name: {
    exists: { errorMessage: 'Category name is required' },
    isString: { errorMessage: 'Category name should be string' },
    custom: {
      options: (value) => {
        if (value.length <= 5) {
          throw new Error('Category name should be more than 2 characters');
        } else if (value.length >= 32) {
          throw new Error('Category name should be less than 32 characters');
        } else return value;
      },
    },
  },
  description: {
    exists: { errorMessage: 'Category description is required' },
    isString: { errorMessage: 'Category description should be string' },
    custom: {
      options: (value) => {
        if (value.length <= 5) {
          throw new Error(
            'Category description should be more than 2 characters'
          );
        } else if (value.length >= 128) {
          throw new Error(
            'Category description should be less than 128 characters'
          );
        } else return value;
      },
    },
  },
  tags: {
    optional: true,
    isArray: { errorMessage: 'Tags should be array' },
  },
  imgURL: {
    optional: true,
    isString: { errorMessage: 'Image URL should be string' },
  },
  imgBase64: {
    optional: true,
    isString: { errorMessage: 'Image Base64 should be string' },
  },
});

export const searchServiceNameSchema = checkSchema({
  name: {
    // notEmpty: true,
    in: ['params', 'query'],
    exists: { errorMessage: 'Category name is required' },
    isString: { errorMessage: 'Category name should be string' },
    trim: true,
    escape: true,
    toString: true,
    isLength: {
      options: {
        min: 3,
      },
      errorMessage: 'search term should be more than 3 characters',
    },
  },
});

export default categorySchema;
