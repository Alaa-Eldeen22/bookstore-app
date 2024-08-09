const authUser = require("../middleware/authUser");
const authRole = require("../middleware/authRole");
const router = require("express").Router();
const di = require("../config/DIContainer");
const validator = require("express-joi-validation").createValidator({});
const bookCreationSchema = require("../validation/schemas/bookCreationValidation");
const bookUpdateSchema = require("../validation/schemas/bookUpdtateValidation");
const bookIdSchema = require("../validation/schemas/bookIdSchema");

const roles = require("../config/roles");

const bookCreationcontroller = di.bookCreationcontroller;
const bookRetrievalController = di.bookRetrievalController;
const bookDeletionController = di.bookDeletionController;
const bookUpdateController = di.bookUpdateController;

router.get(
  "/",

  bookRetrievalController.getAllBooks
);

router.get(
  "/:id",

  validator.params(bookIdSchema),

  bookRetrievalController.getBook
);

// protect routes
router.post(
  "/",

  authUser,

  authRole(roles.ADMIN),

  validator.body(bookCreationSchema),

  bookCreationcontroller.addBook
);

router.put(
  "/:id",

  authUser,

  authRole(roles.ADMIN),

  validator.params(bookIdSchema),

  validator.body(bookUpdateSchema),

  bookUpdateController.updateBook
);

router.delete(
  "/:id",

  authUser,

  authRole(roles.ADMIN),

  validator.params(bookIdSchema),

  bookDeletionController.deleteBook
);

module.exports = router;
