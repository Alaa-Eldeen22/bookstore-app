class CartController {
  constructor(cartService) {
    this.cartService = cartService;
  }

  /**
   * Add a book to the user's cart.
   * @route POST /api/cart
   * @access Authenticated Users
   */
  addToCart = async (req, res, next) => {
    try {
      await this.cartService.addToCart(req.user.userId, req.body);
      res.status(201).json({ message: "Item added to cart successfully" });
    } catch (err) {
      console.error("Error adding item to cart:", err);
      next(err);
    }
  };

  /**
   * Retrieve the user's cart.
   * @route GET /api/cart
   * @access Authenticated Users
   */
  getCart = async (req, res, next) => {
    try {
      const cart = await this.cartService.getCart(req.user.userId);
      res.status(200).json({ cart });
    } catch (err) {
      console.error("Error fetching cart:", err);
      next(err);
    }
  };

  /**
   * Update a book's quantity in the cart.
   * @route PUT /api/cart
   * @access Authenticated Users
   */
  updateCart = async (req, res, next) => {
    try {
      await this.cartService.updateCart(req.user.userId, req.body);
      res.status(200).json({ message: "Cart updated successfully" });
    } catch (err) {
      console.error("Error updating cart:", err);
      next(err);
    }
  };

  /**
   * Remove a book from the user's cart.
   * @route DELETE /api/cart
   * @access Authenticated Users
   */
  deleteFromCart = async (req, res, next) => {
    try {
      await this.cartService.deleteFromCart(req.user.userId, req.body.bookId);
      res.sendStatus(204); // 204 No Content
    } catch (err) {
      console.error("Error deleting item from cart:", err);
      next(err);
    }
  };
}

module.exports = CartController;
