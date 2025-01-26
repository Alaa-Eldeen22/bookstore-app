class BookService {
  constructor(BookModel) {
    this.BookModel = BookModel;
  }

  /**
   * Adds a new book to the database.
   * @param {Object} bookData - The details of the book to add.
   */
  async addBook(bookData) {
    return await this.BookModel.create(bookData);
  }

  /**
   * Retrieves all books from the database.
   */
  async getAllBooks() {
    const books = await this.BookModel.find();

    return books.map((book) => ({
      bookId: book._id.toString(),
      name: book.name,
      category: book.category,
      authors: book.authors,
      numberOfPages: book.numberOfPages,
      description: book.description,
      price: book.price,
      quantity: book.quantity,
      image: book.image,
    }));
  }

  /**
   * Retrieves a single book by its ID.
   * @param {string} bookId - The ID of the book to retrieve.
   */
  async getBook(bookId) {
    return await this.BookModel.findById(bookId);
  }

  /**
   * Updates a book's details by its ID.
   * @param {string} bookId - The ID of the book to update.
   * @param {Object} bookData - The updated details for the book.
   */
  async updateBook(bookId, bookData) {
    return await this.BookModel.findByIdAndUpdate(bookId, bookData, {
      new: true,
    });
  }

  /**
   * Deletes a book by its ID.
   * @param {string} bookId - The ID of the book to delete.
   */
  async deleteBook(bookId) {
    return await this.BookModel.findByIdAndDelete(bookId);
  }

  /**
   * Searches for books by title.
   * @param {string} title - The title (or partial title) to search for.
   */
  async searchByTitle(title) {
    const books = await this.BookModel.find({
      name: { $regex: title, $options: "i" },
    });

    return books.map((book) => ({
      bookId: book._id.toString(),
      name: book.name,
      category: book.category,
      authors: book.authors,
      numberOfPages: book.numberOfPages,
      description: book.description,
      price: book.price,
      quantity: book.quantity,
      image: book.image,
    }));
  }
}

module.exports = BookService;
