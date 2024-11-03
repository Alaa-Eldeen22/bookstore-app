class CartAddService {
  constructor(CartModel) {
    this.CartModel = CartModel;
  }

  async addToCart(userId, itemData) {
    const cart = await this.CartModel.findOne({ user: userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.book.toString() === itemData.bookId
      );

      if (itemIndex >= 0) {
        cart.items[itemIndex].quantity += itemData.quantity;
      } else {
        cart.items.push({ book: itemData.bookId, quantity: itemData.quantity });
      }

      await cart.save();
      return cart;
    } else {
      const newCart = new this.CartModel({
        user: userId,
        items: [{ book: itemData.bookId, quantity: itemData.quantity }],
      });

      await newCart.save();
      return newCart;
    }
  }
}

module.exports = CartAddService;
