class WishlistService {
  constructor(wishlistModel) {
    this.wishlistModel = wishlistModel;
  }

  /**
   * Add a book to the user's wishlist.
   * Creates a new wishlist if it doesn't exist.
   * @param {string} userId - ID of the user.
   * @param {string} bookId - ID of the book to add.
   */
  async addToWishlist(userId, bookId) {
    let wishlist = await this.wishlistModel.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new this.wishlistModel({
        user: userId,
        items: [bookId],
      });
    } else if (!wishlist.items.includes(bookId)) {
      wishlist.items.push(bookId);
    } else {
      const error = new Error("Book is already in the wishlist.");
      error.statusCode = 409;
      throw error;
    }

    await wishlist.save();
    return wishlist;
  }

  /**
   * Retrieve the user's wishlist with populated book details.
   * @param {string} userId - ID of the user.
   */
  async getWishlist(userId) {
    const wishlist = await this.wishlistModel
      .findOne({ user: userId })
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

  /**
   * Remove a book from the user's wishlist.
   * @param {string} userId - ID of the user.
   * @param {string} bookId - ID of the book to remove.
   */
  async deleteFromWishlist(userId, bookId) {
    const wishlist = await this.wishlistModel.findOne({ user: userId });

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

module.exports = WishlistService;
