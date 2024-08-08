class BookRetrievalService {
  constructor(BookModel) {
    this.BookModel = BookModel;
  }

  async getAllBooks() {
    return await this.BookModel.find();
  }

  async getBook(bookId) {
    return await this.BookModel.findById(bookId);
  }
}

module.exports = BookRetrievalService;
