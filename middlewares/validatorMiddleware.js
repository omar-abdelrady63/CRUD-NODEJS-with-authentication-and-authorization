const AppError = require("../utilities/AppError");

const validate = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false }); 
      next();
    } catch (err) {
      if (err.isJoi) {
        const firstError = err.details[0].message;
        return next(new AppError(firstError, 400));
      }
      next(err);
    }
  };
};

module.exports = validate;
