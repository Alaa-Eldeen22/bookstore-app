class ReviewRetrievalService {
  constructor(ReviewModel) {
    this.ReviewModel = ReviewModel;
  }

  async getAllReviewsForBook(bookId) {
    return await this.ReviewModel.find({ book: bookId }).populate({
      path: "user",
      select: "firstname lastname _id",
    });
  }
}

module.exports = ReviewRetrievalService;
