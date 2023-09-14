// Custom error classes
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

class ValidationError extends AppError {
  constructor(message = 'Validation error') {
    super(message, 400);
  }
}

// You can define more custom error classes as needed.
// errorMiddleware.js

export const errorHandler = (err, req, res, next) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  } else {
    console.error('Error:', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

export const notFoundHandler = (req, res, next) => {
  next(new NotFoundError('Route not found'));
};
