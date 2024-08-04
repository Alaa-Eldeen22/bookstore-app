class BookCreationController {
  constructor(bookCreationService) {
    this.bookCreationService = bookCreationService;
  }

  async addBook(req, res) {
    try {
      const bookData = req.body.book;
      const book = await this.bookCreationService(bookData);

      res.status(201).json({ message: "Book added successfully", book });
    } catch (err) {
      console.log("Error adding book:", err);
      res.status(500).json({
        message:
          "An error occure while adding the book. Please tyr again later",
      });
    }
  }
}

module.exports = BookCreationController;
