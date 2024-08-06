// const joi = require("joi");
const Joi = require("joi");

const bookSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  category: Joi.string().min(1).max(50).required(),
  author: Joi.string().min(1).max(50).required(),
  numberOfPages: Joi.number().integer().min(1).required(),
  description: Joi.string().max(500).optional(),
});

module.exports = bookSchema;
