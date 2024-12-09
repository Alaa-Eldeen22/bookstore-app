class CartRetrievalController {
  constructor(cartRetrievalService) {
    this.cartRetrievalService = cartRetrievalService;
    this.getCart = this.getCart.bind(this);
  }

  async getCart(req, res, next) {
    try {
      const cart = await this.cartRetrievalService.getCart(req.user.userId);

      res.status(200).json({ cart });
    } catch (err) {
      console.log("Error fetching cart", err);
      next(err);
    }
  }
}

module.exports = CartRetrievalController;
