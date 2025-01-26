const express = require("express");
const authUser = require("../middlewares/authUser");
const validator = require("express-joi-validation").createValidator({});
const validateBookId = require("../middlewares/validateBookId");
const cartSchema = require("../validation/schemas/cartValidation");

const di = require("../config/DIContainer");

const cartController = di.cartController;

const router = express.Router();

// Add a book to the cart (Authenticated Users)
router.post(
  "/",
  authUser,
  validator.body(cartSchema),
  cartController.addToCart
);

// Get the user's cart (Authenticated Users)
router.get("/", authUser, cartController.getCart);

// Update a book's quantity in the cart (Authenticated Users)
router.put(
  "/",
  authUser,
  validateBookId,
  validator.body(cartSchema),
  cartController.updateCart
);

// Remove a book from the cart (Authenticated Users)
router.delete("/", authUser, validateBookId, cartController.deleteFromCart);

module.exports = router;
