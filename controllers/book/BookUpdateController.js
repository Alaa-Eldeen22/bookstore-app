class BookCreationController {
    constructor(bookCreationService) {
      this.bookCreationService = bookCreationService;
    }
  
    async addBook(req, res) {
      try {
        const book = await this.bookCreationService.createBook(req.body);
        res.status(201).json({ message: "Book added successfully", book });
      } catch (err) {
        console.error("Error adding book:", err);
        res.status(500).json({ message: "An error occurred while adding the book. Please try again later." });
      }
    }
  }
  
  module.exports = BookCreationController;
  