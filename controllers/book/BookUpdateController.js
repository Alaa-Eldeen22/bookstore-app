class BookUpdateController {
  constructor(bookUpdateService) {
    this.bookUpdateService = bookUpdateService;
    this.updateBook = this.updateBook.bind(this);
  }

  async updateBook(req, res, next) {
    try {
      const book = await this.bookUpdateService.updateBook(
        req.params.bookId,
        req.body
      );

      return res
        .status(200)
        .json({ message: "Book updated successfully", book });
    } catch (err) {
      console.error("Error updating book:", err);

      next(err);
    }
  }
}

module.exports = BookUpdateController;
