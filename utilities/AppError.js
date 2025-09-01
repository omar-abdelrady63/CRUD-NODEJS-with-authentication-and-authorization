class AppError extends Error {
  constructor(message, statusCode, details = null) {
    super(typeof message === "string" ? message : "Validation Error");

    this.statusCode = statusCode;
    this.details = details || (typeof message === "object" ? message : null);

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
