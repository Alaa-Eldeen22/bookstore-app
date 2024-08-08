class BookUpdateService {
    constructor(BookModel) {
      this.BookModel = BookModel;
    }
  
    async updateBook(bookId, bookData) {
      return await this.BookModel.findByIdAndUpdate(bookId, bookData, { new: true });
    }
  }
  
  module.exports = BookUpdateService;
  