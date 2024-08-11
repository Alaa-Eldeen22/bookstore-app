class ReviewCreationController {
  constructor(reviewCreationService) {
    this.reviewCreationService = reviewCreationService;
    this.addReview = this.addReview.bind(this);
  }

  async addReview(req, res, next) {
    try {
      const review = await this.reviewCreationService.addReview(
        req.params.bookId,
        req.user.userId,
        req.body
      );

      res.status(200).json({ message: "Review added successfully", review });
    } catch (err) {
      console.log(err);

      next(err);
    }
  }
}

module.exports = ReviewCreationController;
