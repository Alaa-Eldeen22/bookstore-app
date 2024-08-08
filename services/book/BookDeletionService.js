class BookDeletionService {
  constructor(BookModel) {
    this.BookModel = BookModel;
  }

  async deleteBook(bookId) {
    return await this.BookModel.findByIdAndDelete(bookId);
  }
}

module.exports = BookDeletionService;
