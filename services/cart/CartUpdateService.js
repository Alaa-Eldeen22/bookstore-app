class CartUpdateService {
  constructor(CartModel) {
    this.CartModel = CartModel;
  }

  async updateCart(userId, itemData) {
    const cart = await this.CartModel.findOne({ user: userId });
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
}
