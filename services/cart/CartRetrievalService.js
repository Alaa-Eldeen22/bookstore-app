// class CartRetrievalService {
//   constructor(CartModel) {
//     this.CartModel = CartModel;
//   }

//   async getCart(userId) {
//     const cart = await this.CartModel.findOne({ user: userId }).populate({
//       path: "items.book",
//       select: "name price image",
//     });

//     if (!cart) {
//       const error = new Error("Cart not found for this user.");
//       error.statusCode = 404;
//       throw error;
//     }
//     console.log(cart);
//     return cart;
//   }
// }

// module.exports = CartRetrievalService;
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

    // Map the items array to only include the desired fields
    const simplifiedCart = cart.items.map((item) => ({
      bookId: item.book._id.toString(),
      name: item.book.name,
      price: item.book.price,
      image: item.book.image,
      quantity: item.quantity,
    }));

    console.log(simplifiedCart);
    return simplifiedCart;
  }
}

module.exports = CartRetrievalService;
