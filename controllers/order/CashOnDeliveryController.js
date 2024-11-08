class CashOnDeliveryController {
  constructor(placeOrderService) {
    this.placeOrderService = placeOrderService;
    this.placeOrder = this.placeOrder.bind(this);
  }

  async placeOrder(req, res, next) {
    try {
      await this.placeOrderService.placeOrder(req.user.userId, {
        items: req.cart,
        totalAmount: req.totalAmount,
        name: req.body.name,
        fullAddress: req.body.fullAddress,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        governorate: req.body.governorate,
        notes: req.body.notes,
        paymentMethod: "Cash On Delivery",
      });

      res.status(200).json({ message: "Order placed successfully" });
    } catch (err) {
      console.log("Error placing cash on delivery order", err);
      next(err);
    }
  }
}
module.exports = CashOnDeliveryController;
