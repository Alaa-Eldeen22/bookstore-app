const Book = require("../models/Book");
const User = require("../models/User");
const Review = require("../models/Review");
const Cart = require("../models/Cart");
const Wishlist = require("../models/Wishlist");
const Order = require("../models/Order");

const passwordUtils = require("../utils/passwordUtils");
const tokenUtils = require("../utils/tokenUtils");

const RegisterController = require("../controllers/auth/RegisterController");
const LoginController = require("../controllers/auth/LoginController");
const BookCreationController = require("../controllers/book/BookCreationController");
const BookRetrievalController = require("../controllers/book/BookRetrievalController");
const BookDeletionController = require("../controllers/book/BookDeletionController");
const BookUpdateController = require("../controllers/book/BookUpdateController");
const ReviewCreationController = require("../controllers/review/ReviewCreationConroller");
const ReviewRetrievalController = require("../controllers/review/ReviewRetrievalController");
const ReviewDeletionController = require("../controllers/review/ReviewDeletionController");
const ReviewUpdateController = require("../controllers/review/ReviewUpdateController");
const CartAddController = require("../controllers/cart/CartAddController");
const CartRetrievalController = require("../controllers/cart/CartRetrievalController");
const CartUpdateController = require("../controllers/cart/CartUpdateController");
const CartDeleteController = require("../controllers/cart/CartDeleteController");
const WishlistAddController = require("../controllers/wishlist/WishlistAddController");
const WishlistDeleteController = require("../controllers/wishlist/WishlistDeleteController");
const WishlistRetrievalController = require("../controllers/wishlist/WishlistRetrievalController");
const CashOnDeliveryController = require("../controllers/order/CashOnDeliveryController");
const CreditCardOrderController = require("../controllers/order/CreditCardOrderController");
const OrderConfirmController = require("../controllers/order/OrderConfirmController");
const OrderRetrievalController = require("../controllers/order/OrderRetrievalController");
const OrderUpdateController = require("../controllers/order/OrderUpdateController");
const SearchByTitleController = require("../controllers/book/SearchByTitleController");

const RegisterService = require("../services/auth/RegisterService");
const LoginService = require("../services/auth/LoginService");
const BookCreationService = require("../services/book/BookCreationService");
const BookRetrievalService = require("../services/book/BookRetrievalService");
const BookDeletionService = require("../services/book/BookDeletionService");
const BookUpdateService = require("../services/book/BookUpdateService");
const ReviewCreationService = require("../services/review/ReviewCreationService");
const ReviewRetrievalService = require("../services/review/ReviewRetrievalService");
const ReviewDeletionService = require("../services/review/ReviewDeletionService");
const ReviewUpdateService = require("../services/review/ReviewUpdateService");
const CartAddService = require("../services/cart/CartAddService");
const CartRetrievalService = require("../services/cart/CartRetrievalService");
const CartUpdateService = require("../services/cart/CartUpdateService");
const CartDeleteService = require("../services/cart/CartDeleteService");
const WishlistAddService = require("../services/wishlist/WishlistAddService");
const WishlistDeleteService = require("../services/wishlist/WishlistDeleteService");
const WishlistRetrievalService = require("../services/wishlist/WishlistRetrievalService");
const OrderPlaceService = require("../services/order/OrderPlaceService");
const PaymentService = require("../services/order/PaymentService");
const OrderStatusUpdateService = require("../services/order/OrderStatusUpdateService");
const OrderRetrievalService = require("../services/order/OrderRetrievalService");
const SearchByTitleService = require("../services/book/SearchByTitleService");

class DIContainer {
  constructor() {
    if (!DIContainer.instance) {
      // Services
      this.registerService = new RegisterService(
        passwordUtils.encryptPassword,
        tokenUtils.generateToken,
        User,
        process.env.TOKEN_KEY
      );

      this.loginService = new LoginService(
        passwordUtils.comparePasswords,
        tokenUtils.generateToken,
        User,
        process.env.TOKEN_KEY
      );

      this.bookCreationService = new BookCreationService(Book);
      this.bookRetrievalService = new BookRetrievalService(Book);
      this.bookDeletionService = new BookDeletionService(Book);
      this.bookUpdateService = new BookUpdateService(Book);

      this.reviewCreationService = new ReviewCreationService(Review);
      this.reviewRetrievalService = new ReviewRetrievalService(Review, User);
      this.reviewDeletionService = new ReviewDeletionService(Review);
      this.reviewUpdateService = new ReviewUpdateService(Review);

      this.cartAddService = new CartAddService(Cart);
      this.cartRetrievalService = new CartRetrievalService(Cart);
      this.cartUpdateService = new CartUpdateService(Cart);
      this.cartDeleteService = new CartDeleteService(Cart);

      this.wishlistAddService = new WishlistAddService(Wishlist);
      this.wishlistDeleteService = new WishlistDeleteService(Wishlist);
      this.wishlistRetrievalService = new WishlistRetrievalService(Wishlist);

      this.orderPlaceService = new OrderPlaceService(Order);
      this.paymentService = new PaymentService();
      this.orderStatusUpdateService = new OrderStatusUpdateService(Order);
      this.orderRetrievalService = new OrderRetrievalService(Order);

      this.searchByTitleService = new SearchByTitleService(Book);

      // Controllers
      this.registerController = new RegisterController(this.registerService);
      this.loginController = new LoginController(this.loginService);

      this.bookCreationController = new BookCreationController(
        this.bookCreationService
      );
      this.bookRetrievalController = new BookRetrievalController(
        this.bookRetrievalService
      );
      this.bookDeletionController = new BookDeletionController(
        this.bookDeletionService
      );
      this.bookUpdateController = new BookUpdateController(
        this.bookUpdateService
      );

      this.reviewCreationController = new ReviewCreationController(
        this.reviewCreationService
      );
      this.reviewRetrievalController = new ReviewRetrievalController(
        this.reviewRetrievalService
      );
      this.reviewDeletionController = new ReviewDeletionController(
        this.reviewDeletionService
      );
      this.reviewUpdateController = new ReviewUpdateController(
        this.reviewUpdateService
      );

      this.cartAddController = new CartAddController(this.cartAddService);
      this.cartRetrievalController = new CartRetrievalController(
        this.cartRetrievalService
      );
      this.cartUpdateController = new CartUpdateController(
        this.cartUpdateService
      );
      this.cartDeleteController = new CartDeleteController(
        this.cartDeleteService
      );

      this.wishlistAddController = new WishlistAddController(
        this.wishlistAddService
      );
      this.wishlistDeleteController = new WishlistDeleteController(
        this.wishlistDeleteService
      );
      this.wishlistRetrievalController = new WishlistRetrievalController(
        this.wishlistRetrievalService
      );
      this.cashOnDeliveryController = new CashOnDeliveryController(
        this.orderPlaceService
      );

      this.creditCardOrderController = new CreditCardOrderController(
        this.orderPlaceService,
        this.paymentService
      );
      this.orderConfirmController = new OrderConfirmController(
        this.orderStatusUpdateService
      );

      this.orderRetrievalController = new OrderRetrievalController(
        this.orderRetrievalService
      );

      this.orderUpdateController = new OrderUpdateController(
        this.orderStatusUpdateService
      );

      this.searchByTitleController = new SearchByTitleController(
        this.searchByTitleService
      );

      DIContainer.instance = this;
    }

    return DIContainer.instance;
  }
}

const instance = new DIContainer();
Object.freeze(instance);

module.exports = instance;
