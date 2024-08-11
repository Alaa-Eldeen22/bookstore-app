const authUser = require("../middleware/authUser");
const authRole = require("../middleware/authRole");
const router = require("express").Router();
const di = require("../config/DIContainer");
const validator = require("express-joi-validation").createValidator({});
const bookCreationSchema = require("../validation/schemas/bookCreationValidation");
const bookUpdateSchema = require("../validation/schemas/bookUpdtateValidation");
const bookIdSchema = require("../validation/schemas/bookIdSchema");
const validateBookId = require("../middleware/validateBookId");

const roles = require("../config/roles");

const bookCreationcontroller = di.bookCreationcontroller;
const bookRetrievalController = di.bookRetrievalController;
const bookDeletionController = di.bookDeletionController;
const bookUpdateController = di.bookUpdateController;

const reviewCreationController = di.reviewCreationController;
router.get(
  "/",
  bookRetrievalController.getAllBooks
);

router.get(
  "/:bookId",
  validateBookId,
  bookRetrievalController.getBook
);

router.post(
  "/",
  authUser,
  authRole(roles.ADMIN),
  validator.body(bookCreationSchema),
  bookCreationcontroller.addBook
);

router.put(
  "/:bookId",
  authUser,
  authRole(roles.ADMIN),
  validateBookId,
  validator.body(bookUpdateSchema),
  bookUpdateController.updateBook
);

router.delete(
  "/:bookId",
  authUser,
  authRole(roles.ADMIN),
  validateBookId,
  bookDeletionController.deleteBook
);

router.post(
  "/:bookId/reviews", 
  authUser, validateBookId, 
  reviewCreationController.addReview
)

module.exports = router;
