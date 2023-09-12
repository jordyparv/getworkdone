export const userDataValidateSchemaBased = {
  password: {
    exists: { errorMessage: 'Password is required' },
    isString: { errorMessage: 'password should be string' },
    isLength: {
      options: {
        min: {
          length: 5,
          errorMessage: 'Password should be at least 5 characters',
        },
        max: 128,
      },
      //   errorMessage: 'Password should be at least 5 characters',
    },
  },
  email: {
    isEmail: { errorMessage: 'Please provide valid email' },
  },
};
