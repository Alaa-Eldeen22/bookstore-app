class CartUpdateController {
  constructor(cartUpdateService) {
    this.cartUpdateService = cartUpdateService;
    this.updateCart = this.updateCart.bind(this);
  }

  async updateCart(req, res, next) {
    try {
      await this.cartUpdateService.updateCart(req.user.userId, req.body);

      res.status(200).json({
        message: "Cart updated successfully",
      });
    } catch (err) {
      console.log("Error updating cart", err);
      next(err);
    }
  }
}

module.exports = CartUpdateController;
