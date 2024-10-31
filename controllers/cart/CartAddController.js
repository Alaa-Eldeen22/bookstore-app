class CartAddController {
  constructor(cartAddService) {
    this.cartAddService = cartAddService;
    this.addToCart = this.addToCart.bind(this);
  }

  async addToCart(req, res, next) {
    try {
      const cart = await this.cartAddService.addToCart(
        req.user.userId,
        req.body
      );
      res.status(200).json({ message: "Item added successfully", cart });
    } catch (err) {
      console.log("Error adding item to cart", err);
      next(err);
    }
  }
}

module.exports = CartAddController;
