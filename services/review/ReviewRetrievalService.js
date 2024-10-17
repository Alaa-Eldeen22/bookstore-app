class ReviewRetrievalService {
  constructor(ReviewModel, UserModel) {
    this.ReviewModel = ReviewModel;
    this.UserModel = UserModel;
  }

  async getAllReviewsForBook(bookId) {
    const reviews = await this.ReviewModel.find({ book: bookId }).lean();

    const reviewsWithUserDetails = await Promise.all(
      reviews.map(async (review) => {
        console.log("id: ", review.user.toString());
        const user = await this.UserModel.findById(review.user.toString());
        console.log("fn: ", user.firstname);
        review.firstname = user.firstname;
        review.lastname = user.lastname;
        return review;
      })
    );

    return reviewsWithUserDetails;
  }
}

module.exports = ReviewRetrievalService;
