class BookCreationService {
  constructor(BookModel) {
    this.BookModel = BookModel;
  }

  async addBook(bookData) {
    return await this.BookModel.create(bookData);
  }
}

module.exports = BookCreationService;
