const Book = require("../models/Book");
const User = require("../models/User");

const passwordUtilss = require("../utils/passwordUtils");
const tokenUtils = require("../utils/tokenUtils");

const BookCreationController = require("../controllers/book/BookCreationController");
const LoginController = require("../controllers/auth/LoginController");
const RegisterController = require("../controllers/auth/RegisterController");
const BookRetrievalController = require("../controllers/book/BookRetrievalController");
const BookDeletionController = require("../controllers/book/BookDeletionController");

const BookCreationService = require("../services/book/BookCreationService");
const LoginService = require("../services/auth/LoginService");
const RegisterService = require("../services/auth/RegisterService");
const BookRetrievalService = require("../services/book/BookRetrievalService");
const BookDeletionService = require("../services/book/BookDeletionService");

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
      
      DIContainer.instance = this;
    }

    return DIContainer.instance;
  }
}
const instance = new DIContainer();
Object.freeze(instance);

module.exports = instance;
