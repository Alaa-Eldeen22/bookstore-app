class OrderUpdateController {
  constructor(orderUpdateService) {
    this.orderUpdateService = orderUpdateService;
    this.updateOrder = this.updateOrder.bind(this);
  }

  async updateOrder(req, res, next) {
    try {
      await this.orderUpdateService.updateOrder(req.params.orderId, req.body);

      res.status(200).json({ message: "Order updated successfully" });
    } catch (err) {
      console.log("Error updating order", err);
      next(err);
    }
  }
}

module.exports = OrderUpdateController;
