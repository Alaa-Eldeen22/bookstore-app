class BookDeletionController {
  constructor(bookDeletionService) {
    this.bookDeletionService = bookDeletionService;
    this.deleteBook = this.deleteBook.bind(this);
  }

  async deleteBook(req, res) {
    try {
      const book = await this.bookDeletionService.deleteBook(req.params.bookId);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      return req
        .status(200)
        .json({ message: "Book deleted successfully", book });
    } catch (err) {
      console.error("Error deleting book:", err);
      res.status(500).json({
        message:
          "An error occurred while deleting the book. Please try again later.",
      });
    }
  }
}

module.exports = BookDeletionController;
