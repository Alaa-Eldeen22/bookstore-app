class SearchByTitleService {
  constructor(BookModel) {
    this.BookModel = BookModel;
  }

  async searchByTitle(title) {
    const books = await this.BookModel.find({
      name: { $regex: title, $options: "i" },
    });

    return books.map((book) => ({
      bookId: book._id.toString(),
      name: book.name,
      category: book.category,
      authors: book.authors,
      numberOfPages: book.numberOfPages,
      description: book.description,
      price: book.price,
      quantity: book.quantity,
      image: book.image,
    }));
  }
}

module.exports = SearchByTitleService;
