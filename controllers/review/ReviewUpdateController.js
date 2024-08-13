class ReviewUpdateController {
  constructor(reviewUpdateService) {
    this.reviewUpdateService = reviewUpdateService;
    this.updateReview = this.updateReview.bind(this);
  }

  async updateReview(req, res, next) {
    try {
      const review = await this.reviewUpdateService.updateReview(
        req.params.bookId,
        req.user.userId,
        req.body
      );

      res.status(200).json({ message: "Review updated successfully", review });
    } catch (err) {
      console.log("Error updating review", err);
      next(err);
    }
  }
}

module.exports = ReviewUpdateController;
