const authUser = require("../middlewares/authUser");
const authRole = require("../middlewares/authRole");
const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
require("dotenv").config();
const express = require("express");
const validator = require("express-joi-validation").createValidator({});
const orderSchema = require("../validation/schemas/orderValidation");
const prepareCartData = require("../middlewares/prepareCartData");
const di = require("../config/DIContainer");
const roles = require("../config/roles");

const cashOnDeliveryController = di.cashOnDeliveryController;
const creditCardOrderController = di.creditCardOrderController;
const orderConfirmController = di.orderConfirmController;
const orderRetrievalController = di.orderRetrievalController;

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
  creditCardOrderController.placeOrder
);

router.post("/confirm-order", orderConfirmController.confirmOrder);

router.get(
  "/",
  authUser,
  authRole(roles.ADMIN),
  orderRetrievalController.getOrders
);
module.exports = router;
