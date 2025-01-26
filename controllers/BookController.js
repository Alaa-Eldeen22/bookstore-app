class BookController {
  constructor(bookService) {
    this.bookService = bookService;
  }

  /**
   * Adds a new book to the inventory.
   * @access Admin
   * @route POST /api/books
   */
  addBook = async (req, res, next) => {
    try {
      const book = await this.bookService.addBook(req.body);
      res
        .status(201)
        .json({
          message: "Book added successfully",
          data: { id: book.id, title: book.title },
        });
    } catch (err) {
      console.error("Error adding book:", err);
      next(err);
    }
  };

  /**
   * Retrieves all books in the inventory.
   * @route GET /api/books
   */
  getAllBooks = async (req, res, next) => {
    try {
      const books = await this.bookService.getAllBooks();
      res.status(200).json(books);
    } catch (err) {
      console.error("Error fetching books:", err);
      next(err);
    }
  };

  /**
   * Retrieves a single book by its ID.
   * @route GET /api/books/:bookId
   */
  getBook = async (req, res, next) => {
    try {
      const book = await this.bookService.getBook(req.params.bookId);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.status(200).json(book);
    } catch (err) {
      console.error("Error fetching book:", err);
      next(err);
    }
  };

  /**
   * Updates the details of a book by its ID.
   * @access Admin
   * @route PUT /api/books/:bookId
   */
  updateBook = async (req, res, next) => {
    try {
      const book = await this.bookService.updateBook(
        req.params.bookId,
        req.body
      );
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.status(200).json({ message: "Book updated successfully", book });
    } catch (err) {
      console.error("Error updating book:", err);
      next(err);
    }
  };

  /**
   * Deletes a book by its ID.
   * @access Admin
   * @route DELETE /api/books/:bookId
   */
  deleteBook = async (req, res, next) => {
    try {
      const deleted = await this.bookService.deleteBook(req.params.bookId);
      if (!deleted) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.status(204).send();
    } catch (err) {
      console.error("Error deleting book:", err);
      next(err);
    }
  };

  /**
   * Searches for books by title.
   * @route GET /api/books/search
   */
  searchByTitle = async (req, res, next) => {
    try {
      const title = req.query.title;

      if (!title || title.length < 3) {
        return res.status(400).json({
          message: "Search query must be at least 3 characters long.",
        });
      }

      const books = await this.bookService.searchByTitle(title);
      res.status(200).json(books);
    } catch (err) {
      console.error("Error searching books:", err);
      next(err);
    }
  };
}

module.exports = BookController;
