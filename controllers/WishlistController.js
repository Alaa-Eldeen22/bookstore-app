class WishlistController {
  constructor(wishlistService) {
    this.wishlistService = wishlistService;
  }

  /**
   * Add a book to the user's wishlist.
   * @route POST /api/wishlist
   * @access Authenticated Users
   */
  addToWishlist = async (req, res, next) => {
    try {
      const wishlist = await this.wishlistService.addToWishlist(
        req.user.userId,
        req.body.bookId
      );
      res.status(201).json({ message: "Book added to wishlist", wishlist });
    } catch (err) {
      console.error("Error adding book to wishlist:", err);
      next(err);
    }
  };

  /**
   * Retrieve the user's wishlist.
   * @route GET /api/wishlist
   * @access Authenticated Users
   */
  getWishlist = async (req, res, next) => {
    try {
      const wishlist = await this.wishlistService.getWishlist(req.user.userId);
      res.status(200).json({ wishlist });
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      next(err);
    }
  };

  /**
   * Remove a book from the user's wishlist.
   * @route DELETE /api/wishlist
   * @access Authenticated Users
   */
  deleteFromWishlist = async (req, res, next) => {
    try {
      const wishlist = await this.wishlistService.deleteFromWishlist(
        req.user.userId,
        req.body.bookId
      );
      res.status(200).json({ message: "Book removed from wishlist", wishlist });
    } catch (err) {
      console.error("Error removing book from wishlist:", err);
      next(err);
    }
  };
}

module.exports = WishlistController;
