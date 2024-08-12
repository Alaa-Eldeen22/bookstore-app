class ReviewDeletionService {
  constructor(ReviewModel) {
    this.ReviewModel = ReviewModel;
  }

  async deleteReview(reveiwId) {
    return await this.ReviewModel.findByIdAndDelete(reveiwId);
  }
}

module.exports = ReviewDeletionService;
