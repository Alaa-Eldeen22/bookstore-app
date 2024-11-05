class WishlistRetrievalService {
  constructor(WishlistModel) {
    this.WishlistModel = WishlistModel;
  }

  async getWishlist(userId) {
    const wishlist = await this.WishlistModel.findOne({
      user: userId,
    })
      .populate({
        path: "items",
        model: "Book",
        select: "name price image",
      })
      .lean();

    if (!wishlist) {
      const error = new Error("Wishlist not found for this user.");
      error.statusCode = 404;
      throw error;
    }

    return wishlist.items.map((item) => ({
      bookId: item._id,
      ...item,
      _id: undefined,
    }));
  }
}

module.exports = WishlistRetrievalService;
