class WishlistAddService {
  constructor(WishlistModel) {
    this.WishlistModel = WishlistModel;
  }

  async addToWishlist(userId, bookId) {
    console.log("");
    let wishlist = await this.WishlistModel.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new this.WishlistModel({
        user: userId,
        items: [bookId],
      });
    } else if (!wishlist.items.includes(bookId)) {
      wishlist.items.push([bookId]);
    } else {
      const error = new Error("Book is already in the wishlist.");
      error.statusCode = 409;

      throw error;
    }

    await wishlist.save();
    return wishlist;
  }
}

module.exports = WishlistAddService;
