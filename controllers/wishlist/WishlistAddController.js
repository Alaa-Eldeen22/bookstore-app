class WishlistAddController {
  constructor(wishlistAddService) {
    this.wishlistAddService = wishlistAddService;
    this.addToWishlist = this.addToWishlist.bind(this);
  }

  async addToWishlist(req, res, next) {
    try {
      const wishlist = await this.wishlistAddService.addToWishlist(
        req.user.userId,
        req.body.bookId
      );

      res.status(201).json({ message: "Book added to wishlist", wishlist });
    } catch (err) {
      console.error("Error adding book to wishlist");
      next(err);
    }
  }
}

module.exports = WishlistAddController;
