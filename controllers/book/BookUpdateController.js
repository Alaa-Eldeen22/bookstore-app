class BookUpdateController {
  constructor(bookUpdateService) {
    this.bookUpdateService = bookUpdateService;
    this.updateBook = this.updateBook.bind(this);
  }

  async updateBook(req, res) {
    try {
      const book = await this.bookUpdateService.updateBook(
        req.params.bookId,
        req.body
      );
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res
        .status(200)
        .json({ message: "Book updated successfully", book });
    } catch (err) {
      console.error("Error updating book:", err);
      res.status(500).json({
        message:
          "An error occurred while updating the book. Please try again later.",
      });
    }
  }
}

module.exports = BookUpdateController;
