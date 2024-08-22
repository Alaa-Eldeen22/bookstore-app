const Joi = require("joi");

const bookCreationSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  category: Joi.string().min(1).max(50).required(),
  authors: Joi.string().min(1).max(50).required(),
  numberOfPages: Joi.number().integer().min(1).required(),
  description: Joi.string().max(500).optional(),
  price: Joi.number().min(0).required(),
  image: Joi.string().default(
    "https://dpi.wi.gov/sites/default/files/imce/acp/images/2020_04_07_acp_academic-icon.png"
  ),
});

module.exports = bookCreationSchema;
