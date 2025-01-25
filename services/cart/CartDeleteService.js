class CartDeleteService {
  constructor(CartModel) {
    this.CartModel = CartModel;
  }

  async deleteFromCart(userId, { bookId }) {
    const cart = await this.CartModel.findOne({ user: userId });

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
      const error = new Error("Item not found in the cart");
      error.statusCode = 404;
      throw error;
    }
  }
}

module.exports = CartDeleteService;
