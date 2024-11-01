const authUser = require("../middlewares/authUser");
const wishlistAddSchema = require("../validation/schemas/wishlistAddValidation");
const router = require("express").Router();
const di = require("../config/DIContainer");
const validator = require("express-joi-validation").createValidator({});
const validateBookId = require("../middlewares/validateBookId");

const wishlistAddController = di.wishlistAddController;
const wishlistRetrievalController = di.wishlistRetrievalController;
const wishlistDeleteController = di.wishlistDeleteController;

router.post(
  "/",
  authUser,
  validateBookId,
  validator.body(wishlistAddSchema),
  wishlistAddController.addToWishlist
);

router.get("/", authUser, wishlistRetrievalController.getWishlist);

router.delete(
  "/:bookId",
  authUser,
  validateBookId,
  wishlistDeleteController.deleteFromWishlist
);

module.exports = router;
