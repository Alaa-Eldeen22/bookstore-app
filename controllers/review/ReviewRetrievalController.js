class ReviewRetrievalController {
  constructor(reviewRetrievalService) {
    this.reviewRetrievalService = reviewRetrievalService;
    this.getAllReviewsForBook = this.getAllReviewsForBook.bind(this);
  }

  async getAllReviewsForBook(req, res, next) {
    try {
      const reviews = await this.reviewRetrievalService.getAllReviewsForBook(
        req.params.bookId
      );

      res.status(200).json({ reviews });
    } catch (err) {
      console.log("Error getting reviews.");
      next(err);
    }
  }
}

module.exports = ReviewRetrievalController;
