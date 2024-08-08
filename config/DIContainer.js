const Book = require("../models/Book");
const User = require("../models/User");

const passwordUtilss = require("../utils/passwordUtils");
const tokenUtils = require("../utils/tokenUtils");

const BookCreationController = require("../controllers/book/BookCreationController");
const LoginController = require("../controllers/auth/LoginController");
const registerController = require("../controllers/auth/RegisterController");

const BookCreationService = require("../services/book/BookCreationService");
const LoginService = require("../services/auth/LoginService");
const RegisterService = require("../services/auth/RegisterService");
const RegisterController = require("../controllers/auth/RegisterController");

class DIContainer {
  constructor() {
    if (!DIContainer.instance) {
      // services
      this.bookCreationservice = new BookCreationService(Book);

      this.loginService = new LoginService(
        passwordUtilss.comparePasswords,
        tokenUtils.generateToken,
        User,
        process.env.TOKEN_KEY
      );

      this.registerService = new RegisterService(
        passwordUtilss.encryptPassword,
        tokenUtils.generateToken,
        User,
        process.env.TOKEN_KEY
      );

      // controllers
      this.bookCreationcontroller = new BookCreationController(
        this.bookCreationservice
      );

      this.loginController = new LoginController(this.loginService);

      this.registerController = new RegisterController(this.registerService);

      DIContainer.instance = this;
    }

    return DIContainer.instance;
  }
}
const instance = new DIContainer();
Object.freeze(instance);

module.exports = instance;
