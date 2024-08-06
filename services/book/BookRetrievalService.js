class BookRetrievalService {
  constructor(BookModel) {
    this.BookModel = BookModel;
  }

  async getAllBooks() {
    return await this.BookModel.find();
  }
}

module.exports = BookRetrievalService;
