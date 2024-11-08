const Joi = require("joi");

const orderSchema = Joi.object({
  cart: Joi.array()
    .items(
      Joi.object({
        bookId: Joi.string().required(),
        quantity: Joi.number().integer().positive().required(),
      })
    )
    .min(1)
    .required()
    .messages({
      "array.min": "The cart must contain at least one book.",
    }),

  name: Joi.string().required(),
  fullAddress: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  orderDate: Joi.date().default(() => new Date()),
  email: Joi.string().email().required(),
  governorate: Joi.string().required(),
  notes: Joi.string().min(0).optional(),
});

module.exports = orderSchema;
