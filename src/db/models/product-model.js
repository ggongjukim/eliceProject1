import { model } from "mongoose";
import { ProductSchema } from "../schemas/product-schema";

const Product = model("products", ProductSchema);

export class ProductModel {
  async create(productInfo) {
    const createdNewProduct = await Product.create(productInfo);
    return createdNewProduct;
  }

  async findById(productId) {
    const product = await Product.findOne({ _id: productId }).populate(
      "category"
    );
    return product;
  }

  async findAll(filter, page, perPage) {
    const [total, products] = Promise.all([
      Product.countDocuments(filter),
      Product.find(filter)
        .populate("category")
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage),
    ]);

    const totalPage = Math.ceil(total / perPage);

    return { products, page, perPage, totalPage };
  }

  async update(productId, update) {
    const filter = { _id: productId };
    const option = { returnOriginal: false };

    const updatedProduct = await Product.findOneAndUpdate(
      filter,
      update,
      option
    ).populate("category");
    return updatedProduct;
  }

  async deleteById(productId) {
    const product = await Product.findByIdAndDelete(productId, {
      returnDocument: "before",
    });
    return product;
  }
}

const productModel = new ProductModel();

export { productModel };
