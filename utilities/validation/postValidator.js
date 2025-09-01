const Joi = require("joi");
const User = require("../../models/User");

const createPostSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .required()
    .messages({
      "string.base": "Title must be a string",
      "string.min": "Title must be at least 3 characters",
      "any.required": "Title is required",
    }),

  content: Joi.string()
    .min(10)
    .required()
    .messages({
      "string.base": "Content must be a string",
      "string.min": "Content must be at least 10 characters",
      "any.required": "Content is required",
    }),

  userId: Joi.string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .required()
  .messages({
    "string.pattern.base": "Author ID must be a valid MongoDB ObjectId",
    "any.required": "Author ID is required",
  })
  .external(async (value) => {
    const userExists = await User.findById(value);
    if (!userExists) {
      throw new Error("Author ID does not exist in database");
    }
  }),

});

const updatePostSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .messages({
      "string.min": "Title must be at least 3 characters",
    }),

  content: Joi.string()
    .min(10)
    .messages({
      "string.min": "Content must be at least 10 characters",
    }),

  authorId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({
      "string.pattern.base": "Author ID must be a valid MongoDB ObjectId",
    }),
}).external(async (value) => {
  if (value.authorId) {
    const userExists = await User.findById(value.authorId);
    if (!userExists) {
      throw new Error("Author ID does not exist in database");
    }
  }
});

module.exports = { createPostSchema, updatePostSchema };
