const router = require("express").Router();
const authUser = require("../middlewares/authUser");
const validator = require("express-joi-validation").createValidator({});
const orderSchema = require("../validation/schemas/orderValidation");
const prepareCartData = require("../middlewares/prepareCartData");
const di = require("../config/DIContainer");

const cashOnDeliveryController = di.cashOnDeliveryController;
const CreditCardOrderController = di.creditCardOrderController;
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
  prepareCartData,
  CreditCardOrderController.placeOrder
);
module.exports = router;
