class BookRetrievalController {
  constructor(BookRetrievalService) {
    this.bookRetrievalService = BookRetrievalService;
    this.getAllBooks = this.getAllBooks.bind(this);
    this.getBook = this.getBook.bind(this);
  }

  async getAllBooks(req, res) {
    // console.log(req.params);
    try {
      const books = await this.bookRetrievalService.getAllBooks();

      res.status(200).json({ books });
    } catch (err) {
      console.log("Error fetching book", err);

      res.status(500).json({
        message:
          "An error ocurred while fetching books. Please try again later.",
      });
    }
  }

  async getBook(req, res) {
    // console.log(req.params.bookId);
    try {
      const book = await this.bookRetrievalService.getBook(req.params.bookId);
      if (!book) {
        return res.status(404).json({ message: "Book not found." });
      }

      return res.status(200).json({ book });
    } catch (err) {
      console.error("Error fetching book:", err);
      res.status(500).json({
        message:
          "An error occurred while fetching the book. Please try again later.",
      });
    }
  }
}

module.exports = BookRetrievalController;
