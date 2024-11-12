class OrderRetrievalService {
  constructor(OrderModel) {
    this.OrderModel = OrderModel;
  }

  async getOrders(page = 1) {
    const limit = 10;
    const skip = (page - 1) * limit;
    const orders = await this.OrderModel.find().skip(skip).limit(limit);

    const totalOrders = await this.OrderModel.countDocuments();
    const totalPages = Math.ceil(totalOrders / limit);
    console.log("total Pages : ", totalPages);
    return {
      orders,
      pagination: {
        totalPages,
        totalOrders,
      },
    };
  }
}

module.exports = OrderRetrievalService;
