const Joi = require("joi");

const bookIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

module.exports = bookIdSchema;
