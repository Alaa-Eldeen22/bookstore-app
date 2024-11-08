const Book = require("../models/Book");

const validateCartItems = async (req, res, next) => {
  try {
    const cart = req.body.cart;
    const bookIds = cart.map((item) => item.bookId);

    const booksInDb = await Book.find({ _id: { $in: bookIds } }).select(
      "_id price quantity title"
    );

    const populatedCart = [];

    for (let item of cart) {
      const book = booksInDb.find((b) => b._id.toString() === item.bookId);

      if (!book) {
        const error = new Error(`Book with ID ${item.bookId} not found.`);
        error.statusCode = 404;
        throw error;
      }

      if (item.quantity > book.quantity) {
        const error =
          new Error(`Requested quantity for '${book.title}' exceeds available stock.
          Available quantity: ${book.quantity}.`);
        error.statusCode = 400;
        throw error;
      }

      populatedCart.push({
        book: item.bookId,
        quantity: item.quantity,
        price: book.price,
      });
    }
    
    const totalAmount = populatedCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    req.cart = populatedCart;
    req.totalAmount = totalAmount;

    next();
  } catch (err) {
    console.log("Error validating cart items");
    next(err);
  }
};

module.exports = validateCartItems;
