class ReviewCreationController {
  constructor(reviewCreationService) {
    this.reviewCreationService = reviewCreationService;
  }

  async addReview(req, res) {
    try {
      const review = await this.reviewCreationService(
        req.params.id,
        req.user._id,
        req.body
      );

      res.status(200).json({ message: "Review added successfully", review });
    } catch (err) {
      console.log("Error adding review:", err);
      if (err.message == "You have already reviewd this book.") {
        return res
          .status(400)
          .json({ message: "You have already revies this book." });
      }

      res.status(500).json({
        message:
          "An error occurred while adding the review. Please try again later",
      });
    }
  }
}
