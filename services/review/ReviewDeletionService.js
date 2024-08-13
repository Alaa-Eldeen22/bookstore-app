class ReviewDeletionService {
  constructor(ReviewModel) {
    this.ReviewModel = ReviewModel;
  }

  async deleteReview(bookId, userId) {
    const review = await this.ReviewModel.findOneAndDelete({
      book: bookId,
      user: userId,
    });

    if (!review) {
      const error = new Error("You don't have review for this book.");
      error.statusCode = 404;
      throw error;
    }
    return review;
  }
}

module.exports = ReviewDeletionService;
