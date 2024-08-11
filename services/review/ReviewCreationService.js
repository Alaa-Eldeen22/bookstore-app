class ReviewCreationService {
  constructor(ReviewModel) {
    this.ReviewModel = ReviewModel;
  }

  async addReview(bookId, userId, reviewData) {
    const reviewExist = await this.ReviewModel.exists({
      user: userId,
      book: bookId,
    });

    if (reviewExist) {
      const error = new Error("You have already reviewed this book.");
      error.statusCode = 400;
      throw error;
    }
    
    const review = await this.ReviewModel.create({
      ...reviewData,
      user: userId,
      book: bookId,
    });

    return review;
  }
}

module.exports = ReviewCreationService;
