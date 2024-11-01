const Joi = require("joi");

const cartSchema = Joi.object({
  bookId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
});

module.exports = cartSchema;
