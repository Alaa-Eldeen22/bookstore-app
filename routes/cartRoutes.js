const authUser = require("../middlewares/authUser");
const cartSchema = require("../validation/schemas/cartValidation");
const router = require("express").Router();
const di = require("../config/DIContainer");
const validator = require("express-joi-validation").createValidator({});
const validateBookId = require("../middlewares/validateBookId");

const cartAddController = di.cartAddController;
const cartRetrievalController = di.cartRetrievalController;
const cartUpdateController = di.cartUpdateController;
const cartDeleteController = di.cartDeleteController;

router.post(
  "/",
  authUser,
  validator.body(cartSchema),
  cartAddController.addToCart
);

router.get("/", authUser, cartRetrievalController.getCart);

router.put(
  "/:bookId",
  authUser,
  validateBookId,
  validator.body(cartSchema),
  cartUpdateController.updateCart
);

router.delete(
  "/:bookId",
  authUser,
  validateBookId,
  cartDeleteController.deleteFromCart
);

module.exports = router;
