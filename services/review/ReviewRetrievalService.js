class ReviewRetrievalService {
  constructor(ReviewModel) {
    this.ReviewModel = ReviewModel;
  }

  async getAllReviewsForBook(bookId) {
    return await this.ReviewModel.find({ book: bookId });
  }
}

module.exports = ReviewRetrievalService;
