import { orderModel } from "../db";

class OrderService {
  async addOrder(orderInfo) {
    const newOrder = await orderModel.create(orderInfo);
    return newOrder;
  }

  async getOrderlist() {
    const orders = await orderModel.findAll();
    return orders;
  }

  async getOrderById(orderId) {
    const order = await orderModel.findById(orderId);
    return order;
  }

  async deleteOrder(orderId) {
    const result = await orderModel.deleteById(orderId);
    return result;
  }
}

const orderService = new OrderService();

export { orderService };
