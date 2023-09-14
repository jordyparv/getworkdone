const ErrorHandler = (err, req, res, next) => {
  console.log('Middleware Error Handling');
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || 'Something went wrong';
  console.log(errMsg);

  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    // stack: process.env.NODE_ENV === 'development' ? err.stack : {},
  });
};

export default ErrorHandler;
