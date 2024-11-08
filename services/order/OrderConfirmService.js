class OrderConfirmService {
  constructor(OrderModel) {
    this.OrderModel = OrderModel;
  }

  async confirmOrder(orderId) {
    const order = await this.OrderModel.findById(orderId);
    if (!order) {
      
      const error = new Error("There is no order with such ID");
      console.log("There is no order with such ID: ", orderId);
      error.statusCode = 404;
      throw error;
    } else {
      order.paymentStatus = "paid";
      await order.save();
    }
  }
}

module.exports = OrderConfirmService;
