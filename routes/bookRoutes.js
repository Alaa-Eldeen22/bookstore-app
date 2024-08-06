const authUser = require("../middleware/authUser");
const authRole = require("../middleware/authRole");
const router = require("express").Router();
const BookCreationController = require("../controllers/book/bookCreationController");
const BookCreationService = require("../services/book/BookCreationService");
const Book = require("../models/Book");
const validator = require("express-joi-validation").createValidator({});
const bookSchema = require("../validation/schemas/bookValidation");
const bookCreationservice = new BookCreationService(Book);
const bookCreationcontroller = new BookCreationController(bookCreationservice);

router.post(
  "/",
  authUser,
  authRole("admin"),
  validator.body(bookSchema),
  bookCreationcontroller.addBook
);

module.exports = router;
