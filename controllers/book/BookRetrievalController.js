class BookRetrievalController {
  constructor(BookRetrievalService) {
    this.bookRetrievalService = BookRetrievalService;
    this.getAllBooks = this.getAllBooks.bind(this);
    this.getBook = this.getBook.bind(this);
  }

  async getAllBooks(req, res, next) {
    try {
      const books = await this.bookRetrievalService.getAllBooks();

      res.status(200).json({ books });
    } catch (err) {
      console.log("Error fetching book", err);
      next(err);
    }
  }

  async getBook(req, res, next) {
    try {
      const book = await this.bookRetrievalService.getBook(req.params.bookId);

      return res.status(200).json({ book });
    } catch (err) {
      console.error("Error fetching book:", err);
      next(err);
    }
  }
}

module.exports = BookRetrievalController;
