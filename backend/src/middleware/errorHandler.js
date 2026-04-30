class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const handleCastError = () => new AppError('Invalid data format', 400);

const handleDuplicateError = () => new AppError('Duplicate field value', 400);

const handleJWTError = () => new AppError('Invalid token', 401);

const handleJWTExpiredError = () => new AppError('Token expired', 401);

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  } else {
    // Production: don't leak error details
    let error = { ...err };
    error.message = err.message;

    if (error.code === '22P02') error = handleCastError();
    if (error.code === '23505') error = handleDuplicateError();
    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

    if (error.isOperational) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
        payload: null,
      });
    } else {
      // Programming or unknown errors
      console.error('ERROR 💥', err);
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        payload: null,
      });
    }
  }
};

module.exports = { AppError, errorHandler };