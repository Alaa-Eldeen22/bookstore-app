const authUser = require("../middleware/authUser");
const authRole = require("../middleware/authRole");
const router = require("express").Router();
const di = require("../config/DIContainer");
const validator = require("express-joi-validation").createValidator({});
const bookSchema = require("../validation/schemas/bookValidation");

const bookCreationcontroller = di.bookCreationcontroller;
const bookRetrievalController = di.bookRetrievalController;

router.post(
  "/",
  authUser,
  authRole("admin"),
  validator.body(bookSchema),
  bookCreationcontroller.addBook
);

router.get("/bookId/:bookId", bookRetrievalController.getBook);
router.get("/", bookRetrievalController.getAllBooks);

module.exports = router;
