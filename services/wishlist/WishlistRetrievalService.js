class WishlistRetrievalService {
  constructor(WishlistModel) {
    this.WishlistModel = WishlistModel;
  }

  async getWishlist(userId) {
    const wishlist = await this.WishlistModel.findOne({
      user: userId,
    }).populate("items.book");

    if (!wishlist) {
      const error = new Error("Wishlist not found for this user.");
      error.statusCode = 404;
      throw error;
    }

    return wishlist;
  }
}

module.exports = WishlistRetrievalService;
