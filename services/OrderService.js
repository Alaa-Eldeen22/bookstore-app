class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  /**
   * Place a new order.
   * @param {string} userId - ID of the user placing the order.
   * @param {Object} orderData - Details of the order.
   */
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

    const order = new this.orderModel({
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
    return { orderId: order._id.toString(), totalAmount: order.totalAmount };
  }

  /**
   * Retrieve all orders with pagination.
   * @param {number} page - The page number for pagination.
   */
  async getOrders(page = 1) {
    const limit = 10;
    const skip = (page - 1) * limit;

    const orders = await this.orderModel.find().skip(skip).limit(limit);
    const totalOrders = await this.orderModel.countDocuments();
    const totalPages = Math.ceil(totalOrders / limit);

    return { orders, pagination: { totalPages, totalOrders } };
  }

  /**
   * Update an order's status.
   * @param {string} orderId - ID of the order to update.
   * @param {Object} statusUpdates - Updates for the order's status.
   */
  async updateOrder(orderId, statusUpdates) {
    const order = await this.orderModel.findById(orderId);

    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      throw error;
    }

    if (statusUpdates.paymentStatus) {
      order.paymentStatus = statusUpdates.paymentStatus;
    }

    if (statusUpdates.orderStatus) {
      order.orderStatus = statusUpdates.orderStatus;
    }

    await order.save();
  }
}

module.exports = OrderService;
