class CartService {
  constructor(cartModel) {
    this.cartModel = cartModel;
  }

  /**
   * Add a book to the user's cart.
   * Creates a new cart if it doesn't exist.
   * @param {string} userId - ID of the user.
   * @param {Object} itemData - The book and its quantity to add.
   */
  async addToCart(userId, itemData) {
    const cart = await this.cartModel.findOne({ user: userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.book.toString() === itemData.bookId
      );

      if (itemIndex >= 0) {
        cart.items[itemIndex].quantity += itemData.quantity;
      } else {
        cart.items.push({ book: itemData.bookId, quantity: itemData.quantity });
      }
    } else {
      const newCart = new this.cartModel({
        user: userId,
        items: [{ book: itemData.bookId, quantity: itemData.quantity }],
      });
      await newCart.save();
      return newCart;
    }

    await cart.save();
    return cart;
  }

  /**
   * Retrieve the user's cart with populated book details.
   * @param {string} userId - ID of the user.
   */
  async getCart(userId) {
    const cart = await this.cartModel
      .findOne({ user: userId })
      .populate({
        path: "items.book",
        select: "name price image",
      })
      .lean();

    if (!cart) {
      const error = new Error("Cart not found for this user.");
      error.statusCode = 404;
      throw error;
    }

    return cart.items.map((item) => ({
      bookId: item.book._id,
      ...item.book,
      quantity: item.quantity,
      _id: undefined,
    }));
  }

  /**
   * Update a book's quantity in the user's cart.
   * Removes the item if the quantity is zero or less.
   * @param {string} userId - ID of the user.
   * @param {Object} itemData - The book and its updated quantity.
   */
  async updateCart(userId, itemData) {
    const cart = await this.cartModel.findOne({ user: userId });

    if (!cart) {
      const error = new Error("Cart is not found for this user");
      error.statusCode = 404;
      throw error;
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.book.toString() === itemData.bookId
    );

    if (itemIndex >= 0) {
      if (itemData.quantity > 0) {
        cart.items[itemIndex].quantity = itemData.quantity;
      } else {
        cart.items.splice(itemIndex, 1);
      }
    } else {
      const error = new Error("Item not found in the cart");
      error.statusCode = 404;
      throw error;
    }

    await cart.save();
    return cart;
  }

  /**
   * Remove a book from the user's cart.
   * @param {string} userId - ID of the user.
   * @param {string} bookId - ID of the book to remove.
   */
  async deleteFromCart(userId, bookId) {
    const cart = await this.cartModel.findOne({ user: userId });

    if (!cart) {
      const error = new Error("Cart not found for this user.");
      error.statusCode = 404;
      throw error;
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.book.toString() === bookId
    );

    if (itemIndex >= 0) {
      cart.items.splice(itemIndex, 1);
      await cart.save();
      return cart;
    } else {
      const error = new Error("Book not found in the cart.");
      error.statusCode = 404;
      throw error;
    }
  }
}

module.exports = CartService;
