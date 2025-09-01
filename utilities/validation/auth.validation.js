const Joi = require("joi");

const signupSchema =  Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  age: Joi.number().optional(),
  bio:Joi.string().optional(),
  password:Joi.string().required()
});

const loginSchema =  Joi.object({
  email: Joi.string().email().required(),
  password:Joi.string().required()
});

module.exports={
    signupSchema,
    loginSchema
}