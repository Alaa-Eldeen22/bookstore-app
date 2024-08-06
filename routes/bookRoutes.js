const authUser = require("../middleware/authUser");
const authRole = require("../middleware/authRole");
const router = require("express").Router();
const di = require("../config/DIContainer");
const validator = require("express-joi-validation").createValidator({});
const bookSchema = require("../validation/schemas/bookValidation");
const bookCreationcontroller = di.bookCreationcontroller;
router.post(
  "/",
  authUser,
  authRole("admin"),
  validator.body(bookSchema),
  bookCreationcontroller.addBook
);

router.get("/");
module.exports = router;
