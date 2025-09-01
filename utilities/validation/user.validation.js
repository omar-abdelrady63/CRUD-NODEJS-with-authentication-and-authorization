const Joi = require("joi");

const createUserSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.base": " Name must be a string",
    "string.min": " Name must be at least 3 characters",
    "any.required": " Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": " Please provide a valid email",
    "any.required": " Email is required",
  }),
  age: Joi.number().min(18).required().messages({
    "number.base": " Age must be a number",
    "number.min": " Age must be at least 18",
    "any.required": " Age is required",
  }),
  bio: Joi.string().max(200).optional(),
  password: Joi.string().min(6).required().messages({
    "string.min": " Password must be at least 6 characters",
    "any.required": " Password is required",
  }),
  passwordConfirm: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Password confirmation must match password",
      "any.required": "Please confirm your password",
    }),
});

const updateUserPutSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  age: Joi.number().required(),
  bio: Joi.string().max(200).required(),
  password: Joi.string().min(6).optional(),
  passwordConfirm: Joi.any()
    .equal(Joi.ref("password"))
    .when("password", {
      is: Joi.exist(),
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .messages({
      "any.only": "Password confirmation must match password",
      "any.required": "Please confirm your password",
    }),
});

const updateUserSchema = createUserSchema.fork(
  ["name", "email", "age", "bio", "password", "passwordConfirm"],
  (schema) => schema.optional()
);
module.exports = {
  createUserSchema,
  updateUserPutSchema,
  updateUserSchema,
};