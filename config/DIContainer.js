const Book = require("../models/Book");

const BookCreationController = require("../controllers/book/BookCreationController");

const BookCreationService = require("../services/book/BookCreationService");

class DIContainer {
  constructor() {
    if (!DIContainer.instance) {
      this.bookCreationservice = new BookCreationService(Book);

      this.bookCreationcontroller = new BookCreationController(
        this.bookCreationservice
      );

      DIContainer.instance = this;
    }
    return DIContainer.instance;
  }
}
const instance = new DIContainer();
Object.freeze(instance);

module.exports = instance;
