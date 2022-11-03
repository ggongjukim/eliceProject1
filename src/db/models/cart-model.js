import { model } from "mongoose";
import { CartSchema } from "../schemas/cart-schema";

const Cart = model("cart", CartSchema);

export class CartModel {
  async create(cartInfo) {
    const newCart = await Cart.create(cartInfo);
    return newCart;
  }

  async findByUserId(userId) {
    const cart = await Cart.findOne({ user: userId });
    return cart;
  }

  async deleteByUseId(userId) {
    const result = await Cart.deleteOne({ user: userId });
    return result;
  }
}

const cartModel = new CartModel();

export { cartModel };
