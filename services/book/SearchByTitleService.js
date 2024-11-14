class SearchByTitleService {
  constructor(BookModel) {
    this.BookModel = BookModel;
  }

  async searchByTitle(title) {
    return await this.BookModel.find({
      name: { $regex: title, $options: "i" },
    });
  }
}

module.exports = SearchByTitleService;
