class ReviewUpdateService {
  constructor(ReviewModel) {
    this.ReviewModel = ReviewModel;
  }

  async updateReview(bookId, userId, reviewData) {
    const review = await this.ReviewModel.findOneAndUpdate(
      {
        book: bookId,
        user: userId,
      },
      reviewData,
      { new: true }
    );

    if (!review) {
      const error = new Error("You don't have review for this book.");
      error.statusCode = 404;
      throw error;
    }

    return review;
  }
}

module.exports = ReviewUpdateService;
