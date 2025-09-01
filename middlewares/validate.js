const AppError = require("../utilities/AppError");

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false, convert: true });
    if (error) {
      const messages = error.details.map((d) => ({
        field: d.context.label || d.path.join("."),
        message: d.message,
      }));

      return next(new AppError("Validation Error", 400, messages));
    }
    next();
  };
};

module.exports = validate;
