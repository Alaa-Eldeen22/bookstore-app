class CartRetrievalService {
  constructor(CartModel) {
    this.CartModel = CartModel;
  }

  async getCart(userId) {
    const cart = await this.CartModel.findOne({ user: userId }).populate({
      path: "items.book",
      select: "name price image",
    });

    if (!cart) {
      const error = new Error("Cart not found for this user.");
      error.statusCode = 404;
      throw error;
    }

    return cart;
  }
}

module.exports = CartRetrievalService;
