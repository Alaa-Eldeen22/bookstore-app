const Book = require("../models/Book");
const User = require("../models/User");
const Review = require("../models/Review");

const passwordUtilss = require("../utils/passwordUtils");
const tokenUtils = require("../utils/tokenUtils");

const RegisterController = require("../controllers/auth/RegisterController");
const LoginController = require("../controllers/auth/LoginController");
const BookCreationController = require("../controllers/book/BookCreationController");
const BookRetrievalController = require("../controllers/book/BookRetrievalController");
const BookDeletionController = require("../controllers/book/BookDeletionController");
const BookUpdateController = require("../controllers/book/BookUpdateController");
const ReviewCreationController = require("../controllers/review/ReviewCreationConroller");
const ReviewRetrievalController = require("../controllers/review/ReviewRetrievalController");
const ReviewDeletionController = require("../controllers/review/ReviewDeletionController");
const ReviewUpdateController = require("../controllers/review/ReviewUpdateController");

const RegisterService = require("../services/auth/RegisterService");
const LoginService = require("../services/auth/LoginService");
const BookCreationService = require("../services/book/BookCreationService");
const BookRetrievalService = require("../services/book/BookRetrievalService");
const BookDeletionService = require("../services/book/BookDeletionService");
const BookUpdateService = require("../services/book/BookUpdateService");
const ReviewCreationService = require("../services/review/ReviewCreationService");
const ReviewRetrievalService = require("../services/review/ReviewRetrievalService");
const ReviewDeletionService = require("../services/review/ReviewDeletionService");
const ReviewUpdateService = require("../services/review/ReviewUpdateService");

class DIContainer {
  constructor() {
    if (!DIContainer.instance) {
      // services
      this.registerService = new RegisterService(
        passwordUtilss.encryptPassword,
        tokenUtils.generateToken,
        User,
        process.env.TOKEN_KEY
      );

      this.loginService = new LoginService(
        passwordUtilss.comparePasswords,
        tokenUtils.generateToken,
        User,
        process.env.TOKEN_KEY
      );

      this.bookCreationservice = new BookCreationService(Book);

      this.bookRetrievalService = new BookRetrievalService(Book);

      this.bookDeletionService = new BookDeletionService(Book);

      this.bookUpdateService = new BookUpdateService(Book);

      this.reviewCreationService = new ReviewCreationService(Review);

      this.reviewRetrievalService = new ReviewRetrievalService(Review, User);

      this.reviewDeletionService = new ReviewDeletionService(Review);

      this.reviewUpdateService = new ReviewUpdateService(Review);

      // controllers
      this.registerController = new RegisterController(this.registerService);

      this.loginController = new LoginController(this.loginService);

      this.bookCreationcontroller = new BookCreationController(
        this.bookCreationservice
      );

      this.bookRetrievalController = new BookRetrievalController(
        this.bookRetrievalService
      );

      this.bookDeletionController = new BookDeletionController(
        this.bookDeletionService
      );

      this.bookUpdateController = new BookUpdateController(
        this.bookUpdateService
      );

      this.reviewCreationController = new ReviewCreationController(
        this.reviewCreationService
      );

      this.reviewRetrievalController = new ReviewRetrievalController(
        this.reviewRetrievalService
      );

      this.reviewDeletionController = new ReviewDeletionController(
        this.reviewDeletionService
      );

      this.reviewUpdateController = new ReviewUpdateController(
        this.reviewUpdateService
      );

      DIContainer.instance = this;
    }

    return DIContainer.instance;
  }
}
const instance = new DIContainer();
Object.freeze(instance);

module.exports = instance;
