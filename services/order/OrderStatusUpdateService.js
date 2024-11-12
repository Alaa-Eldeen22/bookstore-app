class OrderStatusUpdateService {
  constructor(OrderModel) {
    this.OrderModel = OrderModel;
  }

  async confirmOrder(orderId, statusUpdates) {
    const order = await this.OrderModel.findById(orderId);
    if (!order) {
      const error = new Error("There is no order with such ID");
      console.log("There is no order with such ID: ", orderId);
      error.statusCode = 404;
      throw error;
    } else {
      // Update paymentStatus if specified
      if (statusUpdates.paymentStatus) {
        order.paymentStatus = statusUpdates.paymentStatus;
      }

      // Update orderStatus if specified
      if (statusUpdates.orderStatus) {
        order.orderStatus = statusUpdates.orderStatus;
      }
      await order.save();
    }
  }
}

module.exports = OrderStatusUpdateService;
