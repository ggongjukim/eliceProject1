import { productModel } from "../db";
import fs from "fs";
import path from "path";

class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
  }

  async addProduct(productInfo) {
    const createdNewProduct = await this.productModel.create(productInfo);
    return createdNewProduct;
  }

  async getProductlist(filter, page, perPage) {
    const products = await this.productModel.findAll(filter, page, perPage);
    return products;
  }

  async getProductById(productId) {
    const product = await this.productModel.findById(productId);
    return product;
  }

  async setProduct(productId, toUpdate) {
    const product = await this.productModel.update(productId, toUpdate);
    return product;
  }

  async deleteProduct(productId) {
    const product = await this.productModel.deleteById(productId);
    product.images.forEach((src) => {
      fs.unlinkSync(path.join(__dirname, `../views${src}`));
    });
    return { success: true };
  }
}

const productService = new ProductService(productModel);

export { productService };
