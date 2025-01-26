const ReviewModel = require("../models/Review");

class ReviewService {
  /**
   * Adds a new review to a book.
   * @param {string} bookId - The ID of the book.
   * @param {string} userId - The ID of the user adding the review.
   * @param {Object} reviewData - The review content.
   * @throws Error if a review already exists for this user and book.
   */
  async addReview(bookId, userId, reviewData) {
    const reviewExist = await ReviewModel.exists({
      user: userId,
      book: bookId,
    });
    if (reviewExist) {
      throw new Error("You have already reviewed this book.");
    }

    return await ReviewModel.create({
      ...reviewData,
      user: userId,
      book: bookId,
    });
  }

  /**
   * Retrieves all reviews for a specific book.
   * @param {string} bookId - The ID of the book.
   * @returns {Array} A list of reviews with user details.
   */
  async getAllReviewsForBook(bookId) {
    return await ReviewModel.find({ book: bookId }).populate({
      path: "user",
      select: "firstname lastname _id",
    });
  }

  /**
   * Updates an existing review for a book.
   * @param {string} bookId - The ID of the book.
   * @param {string} userId - The ID of the user updating the review.
   * @param {Object} reviewData - The updated review content.
   * @throws Error if the review does not exist.
   */
  async updateReview(bookId, userId, reviewData) {
    const review = await ReviewModel.findOneAndUpdate(
      { book: bookId, user: userId },
      reviewData,
      { new: true }
    );
    if (!review) {
      throw new Error("You don't have a review for this book.");
    }
    return review;
  }

  /**
   * Deletes an existing review for a book.
   * @param {string} bookId - The ID of the book.
   * @param {string} userId - The ID of the user deleting the review.
   * @throws Error if the review does not exist.
   */
  async deleteReview(bookId, userId) {
    const review = await ReviewModel.findOneAndDelete({
      book: bookId,
      user: userId,
    });
    if (!review) {
      throw new Error("You don't have a review for this book.");
    }
    return review;
  }
}

module.exports = ReviewService;
