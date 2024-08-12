class ReviewCreationService {
  constructor(ReviewModel) {
    this.ReviewModel = ReviewModel;
  }

  async getReviewsForBook(bookId) {
    return await this.ReviewModel.find({ book: bookId });
  }
}

module.exports = ReviewCreationService;
