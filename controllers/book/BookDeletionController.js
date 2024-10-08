class BookDeletionController {
  constructor(bookDeletionService) {
    this.bookDeletionService = bookDeletionService;
    this.deleteBook = this.deleteBook.bind(this);
  }

  async deleteBook(req, res) {
    try {
      const book = await this.bookDeletionService.deleteBook(req.params.bookId);

      return res
        .status(200)
        .json({ message: "Book deleted successfully", book });
    } catch (err) {
      console.error("Error deleting book:", err);
      next(err);
    }
  }
}

module.exports = BookDeletionController;
