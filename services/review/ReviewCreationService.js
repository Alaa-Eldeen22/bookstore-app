class ReviewCreationService {
  constructor(ReviewModel ) {
    this.ReviewModel = ReviewModel;
  }

  async addReview(bookId, userId, reviewData) {
    // const bookExists = await this.BookModel.exists({ _id: bookId });

    // if (!bookExists) {
    //   throw new Error("The book you are trying to review does not exist.");
    // }

    const reviewExist = await this.ReviewModel.exists({
      user: userId,
      book: bookId,
    });

    if (reviewExist) {
      throw new Error("You have already reviewed this book.");
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
