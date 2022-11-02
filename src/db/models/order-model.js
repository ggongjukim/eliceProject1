import { model } from "mongoose";
import { OrderSchema } from "../schemas/order-schema";

const Order = model("orders", OrderSchema);

export class OrderModel {
  async create(orderInfo) {
    const newOrder = await Order.create(orderInfo);
    return newOrder;
  }

  async findById(orderId) {
    const order = await Order.findById({ _id: orderId });
    return order;
  }

  async findAll() {
    const orders = await Order.find({});
    return orders;
  }

  async deleteById(orderId) {
    const result = await Order.deleteOne({ _id: orderId });
    return result;
  }
}

const orderModel = new OrderModel();

export { orderModel };
