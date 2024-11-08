class PlaceOrderService {
  constructor(OrderModel) {
    this.OrderModel = OrderModel;
  }

  async placeOrder(userId, orderData) {
    const {
      items,
      totalAmount,
      name,
      fullAddress,
      phoneNumber,
      email,
      governorate,
      notes,
      paymentMethod,
    } = orderData;

    const order = new this.OrderModel({
      user: userId,
      items,
      totalAmount,
      name,
      fullAddress,
      phoneNumber,
      email,
      governorate,
      paymentMethod,
      notes,
      orderDate: new Date(),
    });

    await order.save();

    return {
      orderId: order._id,
      totalAmount: order.totalAmount,
    };
  }
}

module.exports = PlaceOrderService;
