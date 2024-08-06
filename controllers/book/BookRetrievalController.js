class BookRetrievalController {
  constructor(BookRetrievalService) {
    this.BookRetrievalService = BookRetrievalService;
  }

  async getAllBooks(req, res) {
    try {
      const books = await this.BookRetrievalService.getAllBooks();

      res.status(200).json({ books });
    } catch (err) {
      console.log("Error fetching book", err);
      res.status(500).json({
        message:
          "An error ocurred while fetching books. Please try again later.",
      });
    }
  }
}
