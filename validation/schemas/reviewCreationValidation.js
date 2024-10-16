const Joi = require("joi");

const reviewCreationSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().max(500).optional(),
});

module.exports = reviewCreationSchema;
