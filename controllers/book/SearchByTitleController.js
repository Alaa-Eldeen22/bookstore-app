class SearchByTitleController {
  constructor(searchByTitleService) {
    this.searchByTitleService = searchByTitleService;
    this.searchByTitle = this.searchByTitle.bind(this);
  }

  async searchByTitle(req, res, next) {
    try {
      const title = req.query.title;

      if (!title || title.length < 3) {
        return res.status(400).json({
          message: "Search query must be at least 3 characters long.",
        });
      }

      const books = await this.searchByTitleService.searchByTitle(title);

      res.status(200).json({ books });
    } catch (err) {
      console.log("Error searching books ", err.message);
      next(err);
    }
  }
}

module.exports = SearchByTitleController;
