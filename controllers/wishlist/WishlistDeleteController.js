class WishlistDeleteController {
  constructor(wishlistDeleteService) {
    this.wishlistDeleteService = wishlistDeleteService;
    this.deleteFromWishlist = this.deleteFromWishlist.bind(this);
  }

  async deleteFromWishlist(req, res, next) {
    try {
      const wishlist = await this.wishlistDeleteService.deleteFromWishlist(
        req.user.userId,
        req.body
      );

      res.status(200).json({ message: "Book removed from wishlist", wishlist });
    } catch (err) {
      console.error("Error removing book from wishlist:", err);
      next(err);
    }
  }
}

module.exports = WishlistDeleteController;
