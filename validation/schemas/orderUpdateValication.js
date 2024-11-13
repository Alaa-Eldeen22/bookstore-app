const Joi = require("joi");

const orderUpdateSchema = Joi.object({
  paymentStatus: Joi.string().optional(),
  orderStatus: Joi.string().optional()
})
  .or("paymentStatus", "orderStatus") 
  .unknown(false) 
  .messages({
    "object.unknown": "You are not allowed to update this field",
  });

module.exports = orderUpdateSchema;
