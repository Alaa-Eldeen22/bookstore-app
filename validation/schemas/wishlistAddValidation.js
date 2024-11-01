const Joi = require("joi");

const wishlistAddSchema = Joi.object({
  bookId: Joi.string().required(),
});

module.exports = wishlistAddSchema;
