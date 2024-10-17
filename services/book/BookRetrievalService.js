class BookRetrievalService {
  constructor(BookModel) {
    this.BookModel = BookModel;
  }

  async getAllBooks() {
    return await this.BookModel.find();
  }

  async getBook(bookId) {
    console.log("id: ", bookId);
    return await this.BookModel.findById(bookId);
  }
}

module.exports = BookRetrievalService;
