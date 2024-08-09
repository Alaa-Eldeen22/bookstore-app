const Joi = require("joi");

const bookUpdateSchema = Joi.object({
  name: Joi.string().min(1).max(100).optional(),
  category: Joi.string().min(1).max(50).optional(),
  author: Joi.string().min(1).max(50).optional(),
  numberOfPages: Joi.number().integer().min(1).optional(),
  description: Joi.string().max(500).optional(),
}).min(1);

module.exports = bookUpdateSchema;
