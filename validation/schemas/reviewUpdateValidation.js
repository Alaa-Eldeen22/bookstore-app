const Joi = require("joi");

const reviewUpdateSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).optional(),
  comment: Joi.string().max(500).optional(),
}).min(1);

module.exports = reviewUpdateSchema;
