class WishlistDeleteService {
  constructor(WishlistModel) {
    this.WishlistModel = WishlistModel;
  }

  async deleteFromWishlist(userId, { bookId }) {
    const wishlist = await this.WishlistModel.findOne({ user: userId });

    if (!wishlist) {
      const error = new Error("Wishlist not found for this user.");
      error.statusCode = 404;
      throw error;
    }

    const itemIndex = wishlist.items.indexOf(bookId);
    if (itemIndex >= 0) {
      wishlist.items.splice(itemIndex, 1);
      await wishlist.save();
      return wishlist;
    } else {
      const error = new Error("Book not found in the wishlist.");
      error.statusCode = 404;
      throw error;
    }
  }
}

module.exports = WishlistDeleteService;
