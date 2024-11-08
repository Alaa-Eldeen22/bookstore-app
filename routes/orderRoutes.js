const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
require("dotenv").config();
const express = require("express");
const authUser = require("../middlewares/authUser");
const validator = require("express-joi-validation").createValidator({});
const orderSchema = require("../validation/schemas/orderValidation");
const prepareCartData = require("../middlewares/prepareCartData");
const di = require("../config/DIContainer");

const cashOnDeliveryController = di.cashOnDeliveryController;
const CreditCardOrderController = di.creditCardOrderController;
const orderConfirmController = di.orderConfirmController;

router.post(
  "/cash-on-delivery",
  authUser,
  validator.body(orderSchema),
  prepareCartData,
  cashOnDeliveryController.placeOrder
);

router.post(
  "/credit-card",
  authUser,
  validator.body(orderSchema),
  prepareCartData,
  CreditCardOrderController.placeOrder
);

router.post("/confirm-order", orderConfirmController.confirmOrder);
module.exports = router;
// -----------

// // Match the raw body to content type application/json
// // If you are using Express v4 - v4.16 you need to use body-parser, not express, to retrieve the request body
// app.post('/webhook', express.json({type: 'application/json'}), (req, res) => {
//   const event = req.body;

//   // Handle the event

//   // Return a response to acknowledge receipt of the event
//   res.json({received: true});
// });

// app.listen(4242, () => console.log('Running on port 4242'));
