import { checkSchema } from 'express-validator';
export const userRegistrationValidationSchema = checkSchema({
  password: {
    exists: { errorMessage: 'Password is required' },
    isString: { errorMessage: 'password should be string' },
    custom: {
      options: (value) => {
        if (value.length <= 5) {
          throw new Error('password should be more than 5 characters');
        } else if (value.length >= 128) {
          throw new Error('password should be less than 128 characters');
        } else return value;
      },
    },
  },
  email: {
    isEmail: { errorMessage: 'Please provide valid email' },
  },
});

export const userForgotPasswordValidationSchema = checkSchema({
  email: {
    isEmail: { errorMessage: 'Please provide valid email' },
  },
});
