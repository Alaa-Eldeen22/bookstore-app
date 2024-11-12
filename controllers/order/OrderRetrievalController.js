class OrderRetrievalController {
  constructor(orderRetrievalService) {
    this.orderRetrievalService = orderRetrievalService;
    this.getOrders = this.getOrders.bind(this);
  }

  async getOrders(req, res, next) {
    console.log("orderRetrieval called");
    try {
      const page = parseInt(req.query.page) || 1;

      const orders = await this.orderRetrievalService.getOrders(page);
      res.status(200).json({ orders });
    } catch (err) {
      console.log("Error fetcing orders: ", err);
      next(err);
    }
  }
}

module.exports = OrderRetrievalController;
