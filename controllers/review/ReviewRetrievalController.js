const ReviewCreationController = require("./ReviewCreationConroller");

class ReviewRetrievalController {
  constructor(reviewRetrievalService) {
    this.reviewRetrievalService = reviewRetrievalService;
  }

  async getAllReviews(req, res, next) {
    try {
      const reviews = this.reviewRetrievalService(req.parama.bookId);

      res.status(200).json({ reviews });
    } catch (err) {
      console.log("Error getting reviews.");
      next(err);
    }
  }
}

module.exports = ReviewCreationController;
