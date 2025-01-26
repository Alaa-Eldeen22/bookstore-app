const express = require("express");
const authUser = require("../middlewares/authUser");
const validator = require("express-joi-validation").createValidator({});
const validateBookId = require("../middlewares/validateBookId");

const di = require("../config/DIContainer");
const WishlistController = require("../controllers/WishlistController");

const wishlistController = new WishlistController(di.wishlistService);

const router = express.Router();

/**
 * Wishlist Routes
 */

// Add a book to the wishlist (Authenticated Users)
router.post(
  "/",
  authUser,
  validateBookId,
  validator.body(di.wishlistAddValidationSchema),
  wishlistController.addToWishlist
);

// Get the user's wishlist (Authenticated Users)
router.get("/", authUser, wishlistController.getWishlist);

// Remove a book from the wishlist (Authenticated Users)
router.delete(
  "/",
  authUser,
  validateBookId,
  wishlistController.deleteFromWishlist
);

module.exports = router;
