class ReviewCreationService {
  constructor(ReviewModel) {
    this.ReviewModel = ReviewModel;
  }

  async addReview(userId, bookId, reviewData) {
    const reviewExist = this.ReviewModel.findOne({
      user: userId,
      book: bookId,
    });

    if (reviewExist) {
      throw new Error("You have already reviewd this book.");
    }

    const review = await this.ReviewModel.create({
      ...reviewData,
      user: userId,
      book: bookId,
    });

    return review;
  }
}
