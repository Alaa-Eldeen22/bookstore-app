const Joi = require("joi");

const loingScema = Joi.object({
  mail: Joi.string().email().required(),
  password: Joi.string().min(6).max(15).required(),
});

module.exports = loingScema;
