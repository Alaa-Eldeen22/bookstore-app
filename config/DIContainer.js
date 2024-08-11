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

const RegisterService = require("../services/auth/RegisterService");
const LoginService = require("../services/auth/LoginService");
const BookCreationService = require("../services/book/BookCreationService");
const BookRetrievalService = require("../services/book/BookRetrievalService");
const BookDeletionService = require("../services/book/BookDeletionService");
const BookUpdateService = require("../services/book/BookUpdateService");
const ReviewCreationService = require("../services/review/ReviewCreationService");

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
      
      DIContainer.instance = this;
    }

    return DIContainer.instance;
  }
}
const instance = new DIContainer();
Object.freeze(instance);

module.exports = instance;
