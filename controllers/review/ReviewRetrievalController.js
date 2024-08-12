const ReviewCreationController = require("./ReviewCreationConroller");

class ReviewRetrievalController {
  constructor(reviewRetrievalService) {
    this.reviewRetrievalService = reviewRetrievalService;
  }

  async getAllReviewsForBook(req, res, next) {
    try {
      const reviews = await this.reviewRetrievalService.getAllReviewsForBook(
        req.parama.bookId
      );

      res.status(200).json({ reviews });
    } catch (err) {
      console.log("Error getting reviews.");
      next(err);
    }
  }
}

module.exports = ReviewCreationController;
