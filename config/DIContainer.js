const Book = require("../models/Book");
const User = require("../models/User");
const Review = require("../models/Review");
const Cart = require("../models/Cart");
const Wishlist = require("../models/Wishlist");
const Order = require("../models/Order");

const passwordUtils = require("../utils/passwordUtils");
const tokenUtils = require("../utils/tokenUtils");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const DOMAIN = process.env.DOMAIN;

const AuthController = require("../controllers/AuthController");
const BookController = require("../controllers/BookController");
const ReviewController = require("../controllers/ReviewController");
const CartController = require("../controllers/CartController");
const WishlistController = require("../controllers/WishlistController");
const OrderController = require("../controllers/OrderController");

const AuthService = require("../services/AuthService");
const BookService = require("../services/BookService");
const ReviewService = require("../services/ReviewService");
const CartService = require("../services/CartService");
const WishlistService = require("../services/WishlistService");
const OrderService = require("../services/OrderService");
const PaymentService = require("../services/PaymentService");

class DIContainer {
  constructor() {
    if (!DIContainer.instance) {
      // Services
      this.authService = new AuthService(
        passwordUtils.encryptPassword,
        passwordUtils.comparePasswords,
        tokenUtils.generateToken,
        User,
        process.env.TOKEN_KEY
      );

      this.bookService = new BookService(Book);

      this.reviewService = new ReviewService(Review);

      this.cartService = new CartService(Cart);

      this.wishlistService = new WishlistService(Wishlist);

      this.orderService = new OrderService(Order);

      this.paymentService = new PaymentService(stripe, DOMAIN);

      // Controllers
      this.authController = new AuthController(this.authService);

      this.bookController = new BookController(this.bookService);

      this.reviewController = new ReviewController(this.reviewService);

      this.cartController = new CartController(this.cartService);

      this.wishlistController = new WishlistController(this.wishlistService);

      this.orderController = new OrderController(
        this.orderService,
        this.paymentService
      );

      DIContainer.instance = this;
    }

    return DIContainer.instance;
  }
}

const instance = new DIContainer();
Object.freeze(instance);

module.exports = instance;
