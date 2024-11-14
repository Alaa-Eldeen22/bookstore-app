const Joi = require("joi");

const registerSchema = Joi.object({
  firstname: Joi.string().min(1).max(20).required(),
  lastname: Joi.string().min(1).max(20).required(),
  mail: Joi.string().email().required(),
  password: Joi.string().min(6).max(15).required(),
  // role: Joi.string().valid("admin", "user").default("user"),
  role: Joi.string().valid("user").default("user"),
});

module.exports = registerSchema;
