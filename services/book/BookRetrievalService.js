class BookRetrievalService {
  constructor(BookModel) {
    this.BookModel = BookModel;
  }

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

  async getBook(bookId) {
    return await this.BookModel.findById(bookId);
  }
}

module.exports = BookRetrievalService;
