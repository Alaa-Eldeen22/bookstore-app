const ReviewService = require("../services/ReviewService");

class ReviewController {
  constructor() {
    this.reviewService = new ReviewService();
  }

  /**
   * Adds a new review for a book.
   * @route POST /books/:bookId/reviews
   * @access Authenticated Users
   */
  addReview = async (req, res, next) => {
    try {
      const review = await this.reviewService.addReview(
        req.params.bookId,
        req.user.userId,
        req.body
      );
      res.status(201).json({ message: "Review added successfully", review });
    } catch (err) {
      next(err);
    }
  };

  /**
   * Retrieves all reviews for a specific book.
   * @route GET /books/:bookId/reviews
   * @access Public
   */
  getAllReviewsForBook = async (req, res, next) => {
    try {
      const reviews = await this.reviewService.getAllReviewsForBook(
        req.params.bookId
      );
      res.status(200).json({ reviews });
    } catch (err) {
      next(err);
    }
  };

  /**
   * Updates an existing review for a book.
   * @route PUT /books/:bookId/reviews
   * @access Authenticated Users
   */
  updateReview = async (req, res, next) => {
    try {
      const review = await this.reviewService.updateReview(
        req.params.bookId,
        req.user.userId,
        req.body
      );
      res.status(200).json({ message: "Review updated successfully", review });
    } catch (err) {
      next(err);
    }
  };

  /**
   * Deletes an existing review for a book.
   * @route DELETE /books/:bookId/reviews
   * @access Authenticated Users
   */
  deleteReview = async (req, res, next) => {
    try {
      const review = await this.reviewService.deleteReview(
        req.params.bookId,
        req.user.userId
      );
      res.status(200).json({ message: "Review deleted successfully", review });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = ReviewController;
