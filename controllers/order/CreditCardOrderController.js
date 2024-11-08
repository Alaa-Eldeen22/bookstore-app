class CreditCardOrderController {
  constructor(orderPalceService, paymentService) {
    this.orderPalceService = orderPalceService;
    this.paymentService = paymentService;
    this.placeOrder = this.placeOrder.bind(this);
  }

  async placeOrder(req, res, next) {
    try {
      // Step 1: Place the order and get order details
      const order = await this.orderPalceService.placeOrder(req.user.userId, {
        items: req.cart,
        totalAmount: req.totalAmount,
        name: req.body.name,
        fullAddress: req.body.fullAddress,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        governorate: req.body.governorate,
        notes: req.body.notes,
        paymentMethod: "Credit Card",
      });

      // Step 2: Call payment service to initialize Stripe checkout session
      const sessionUrl = await this.paymentService.createStripeSession(
        order._id,
        order.totalAmount
      );

      res.json({ url: sessionUrl });
    } catch (err) {
      console.error("Error placing credit card order", err);
      next(err);
    }
  }
}

module.exports = CreditCardOrderController;
