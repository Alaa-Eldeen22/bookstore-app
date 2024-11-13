class OrderConfirmController {
  constructor(orderStatusUpdateService) {
    this.orderStatusUpdateService = orderStatusUpdateService;
    this.confirmOrder = this.confirmOrder.bind(this);
  }

  async confirmOrder(req, res, next) {
    try {
      const orderData = req.body;
      if (orderData.eventType === "checkout.session.completed") {
        await this.orderStatusUpdateService.UpdateOrder(orderData.orderId, {
          paymentStatus: "paid",
        });
      } else {
        return res.status(400).json({ error: "Unsupported event type" });
      }
      res.json({ received: true });
    } catch (err) {
      console.log("Error confirming order", err);
      next(err);
    }
  }
}

module.exports = OrderConfirmController;
