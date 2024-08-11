class ReviewCreationController {
  constructor(reviewCreationService) {
    this.reviewCreationService = reviewCreationService;
    this.addReview = this.addReview.bind(this);
  }

  async addReview(req, res) {
    try {
      const review = await this.reviewCreationService.addReview(
        req.params.bookId,
        req.user.userId,
        req.body
      );

      res.status(200).json({ message: "Review added successfully", review });
    } catch (err) {
      console.log("Error adding review:", err);
      if (err.message == "You have already reviewed this book.") {
        return res
          .status(400)
          .json({ message: "You have already reviewed this book." });
      }

      res.status(500).json({
        message:
          "An error occurred while adding the review. Please try again later",
      });
    }
  }
}

module.exports = ReviewCreationController;
