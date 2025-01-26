const express = require("express");
const authUser = require("../middlewares/authUser");
const authRole = require("../middlewares/authRole");
const validator = require("express-joi-validation").createValidator({});
const validateBookId = require("../middlewares/validateBookId");
const roles = require("../config/roles");
const bookCreationSchema = require("../validation/schemas/bookCreationValidation");
const bookUpdateSchema = require("../validation/schemas/bookUpdtateValidation");

const reviewValidationSchema = require("../validation/schemas/reviewValidation");
const di = require("../config/DIContainer");

const router = express.Router();

const bookController = di.bookController;

// Create a new book
router.post(
  "/",
  authUser,
  authRole(roles.ADMIN), // Restrict to admins
  validator.body(bookCreationSchema),
  bookController.addBook
);

// Retrieve all books
router.get("/", bookController.getAllBooks);

// Retrieve a single book by ID
router.get("/:bookId", validateBookId, bookController.getBook);

// Update a book by ID
router.put(
  "/:bookId",
  authUser,
  authRole(roles.ADMIN), // Restrict to admins
  validator.body(bookUpdateSchema),
  bookController.updateBook
);

// Delete a book by ID
router.delete(
  "/:bookId",
  authUser,
  authRole(roles.ADMIN), // Restrict to admins
  bookController.deleteBook
);

// Search books by title
router.get("/search", bookController.searchByTitle);

module.exports = router;
