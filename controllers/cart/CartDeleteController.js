class CartDeleteController {
  constructor(cartDeleteService) {
    this.cartDeleteService = cartDeleteService;
    this.deleteFromCart = this.deleteFromCart.bind(this);
  }

  async deleteFromCart(req, res, next) {
    try {
      const cart = await this.cartDeleteService.deleteFromCart(
        req.user.useId,
        req.body
      );

      res.status(200).json({ message: "Item deleted successfully", cart });
    } catch (err) {
      console.log("Error deleting item from cart", err);
      next(err);
    }
  }
}

module.exports = CartDeleteController;
