class ReviewDeletionContoller {
  constructor(reviewDeletionService) {
    this.reviewDeletionService = reviewDeletionService;
    this.deleteReview = this.deleteReview.bind(this);
  }

  async deleteReview(req, res, next) {
    try {
      const review = await this.reviewDeletionService.deleteReview(
        req.params.bookId,
        req.user.userId
      );

      res.status(200).json({ message: "Review deleted successfully." , review});
    } catch (err) {
      console.log("Error deleting review", err);
      next(err);
    }
  }
}

module.exports = ReviewDeletionContoller;
