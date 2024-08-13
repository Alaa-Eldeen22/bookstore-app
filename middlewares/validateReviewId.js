const Review = require("../models/Review");
const isValidObjectId = require("../utils/isValidObjectId");

const validateReviewId = async (req, res, next) => {
  try {
    const { reviewId } = req.body;
    if (!isValidObjectId(reviewId)) {
      return res.status(400).json({ message: "Invalid review ID" });
    }

    const reviewExists = await Review.exists({ _id: reviewId });

    if (!reviewExists) {
      return res.status(404).json({ message: "The review does not exist" });
    }

    next();
  } catch (err) {
    console.log("Error checking review existence", err);
    res.status(500).json({ message: "Server Error, please try again later" });
  }
};

module.exports = validateReviewId;
