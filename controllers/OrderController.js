class OrderController {
  constructor(orderService, paymentService) {
    this.orderService = orderService;
    this.paymentService = paymentService;
  }

  /**
   * Place a cash-on-delivery order.
   * @route POST /api/orders/cash-on-delivery
   * @access Authenticated Users
   */
  placeCashOnDeliveryOrder = async (req, res, next) => {
    try {
      await this.orderService.placeOrder(req.user.userId, {
        ...req.body,
        items: req.cart,
        totalAmount: req.totalAmount,
        paymentMethod: "Cash On Delivery",
      });

      res.status(200).json({ message: "Order placed successfully" });
    } catch (err) {
      console.error("Error placing cash-on-delivery order:", err);
      next(err);
    }
  };

  /**
   * Place a credit card order.
   * @route POST /api/orders/credit-card
   * @access Authenticated Users
   */
  placeCreditCardOrder = async (req, res, next) => {
    try {
      const order = await this.orderService.placeOrder(req.user.userId, {
        ...req.body,
        items: req.cart,
        totalAmount: req.totalAmount,
        paymentMethod: "Credit Card",
      });

      const sessionUrl = await this.paymentService.createStripeSession(
        order.orderId,
        order.totalAmount
      );

      res.json({ url: sessionUrl });
    } catch (err) {
      console.error("Error placing credit card order:", err);
      next(err);
    }
  };

  /**
   * Confirm an order after payment (Webhook).
   * @route POST /api/orders/confirm-order
   * @access Public
   */
  confirmOrder = async (req, res, next) => {
    try {
      const { eventType, orderId } = req.body;

      if (eventType === "checkout.session.completed") {
        await this.orderService.updateOrder(orderId, { paymentStatus: "paid" });
        res.json({ received: true });
      } else {
        res.status(400).json({ error: "Unsupported event type" });
      }
    } catch (err) {
      console.error("Error confirming order:", err);
      next(err);
    }
  };

  /**
   * Retrieve all orders (Admin only).
   * @route GET /api/orders
   * @access Admin
   */
  getOrders = async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const orders = await this.orderService.getOrders(page);

      res.status(200).json({ orders });
    } catch (err) {
      console.error("Error fetching orders:", err);
      next(err);
    }
  };

  /**
   * Update an order's status (Admin only).
   * @route PUT /api/orders/:orderId
   * @access Admin
   */
  updateOrder = async (req, res, next) => {
    try {
      await this.orderService.updateOrder(req.params.orderId, req.body);
      res.status(200).json({ message: "Order updated successfully" });
    } catch (err) {
      console.error("Error updating order:", err);
      next(err);
    }
  };
}

module.exports = OrderController;
