const Book = require("../models/Book");
const isValidObjectId = require("../utils/isValidObjectId");

const validateBookId = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const bookExists = await Book.exists({ _id: id });

    if (!bookExists) {
      return res.status(404).json({ message: "The book does not exist" });
    }

    next();
  } catch (err) {
    console.log("Error checking book existence", err);
    res.status(500).json({ message: "Server Error, please try again later" });
  }
};

module.exports = validateBookId;
