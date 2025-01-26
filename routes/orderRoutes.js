const router = require("express").Router();
const authUser = require("../middlewares/authUser");
const authRole = require("../middlewares/authRole");
const validator = require("express-joi-validation").createValidator({});
const validateBookId = require("../middlewares/validateBookId");
const orderSchema = require("../validation/schemas/orderValidation");
const prepareCartData = require("../middlewares/prepareCartData");
const roles = require("../config/roles");

const di = require("../config/DIContainer");
const orderController = di.orderController;

// Place a cash-on-delivery order (Authenticated Users)
router.post(
  "/cash-on-delivery",
  authUser,
  validator.body(orderSchema),
  prepareCartData,
  orderController.placeCashOnDeliveryOrder
);

// Place a credit card order (Authenticated Users)
router.post(
  "/credit-card",
  authUser,
  validator.body(orderSchema),
  prepareCartData,
  orderController.placeCreditCardOrder
);

// Confirm an order (Webhook)
router.post("/confirm-order", orderController.confirmOrder);

// Retrieve all orders (Admin Only)
router.get("/", authUser, authRole(roles.ADMIN), orderController.getOrders);

// Update an order's status (Admin Only)
router.put(
  "/:orderId",
  authUser,
  authRole(roles.ADMIN),
  validator.body(orderUpdateSchema),
  orderController.updateOrder
);

module.exports = router;
