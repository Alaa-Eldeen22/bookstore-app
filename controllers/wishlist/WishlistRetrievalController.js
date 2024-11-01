class WishlistRetrievalController {
  constructor(wishlistRetrievalService) {
    this.wishlistRetrievalService = wishlistRetrievalService;
    this.getWishlist = this.getWishlist.bind(this);
  }

  async getWishlist(req, res, next) {
    try {
      const wishlist = await this.wishlistRetrievalService.getWishlist(
        req.user.userId
      );
      res.status(200).json({ wishlist });
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      next(err);
    }
  }
}

module.exports = WishlistRetrievalController;
