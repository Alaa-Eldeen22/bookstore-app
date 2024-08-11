class BookCreationController {
  constructor(bookCreationService) {
    this.bookCreationService = bookCreationService;
    this.addBook = this.addBook.bind(this);
  }

  async addBook(req, res, next) {
    try {
      const book = await this.bookCreationService.addBook(req.body);

      res.status(201).json({ message: "Book added successfully", book });
    } catch (err) {
      console.log("Error adding book:", err);
      next(err);
    }
  }
}

module.exports = BookCreationController;
