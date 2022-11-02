import { productModel } from "../db";

class ProductService {
  async addProduct(productInfo) {
    const createdNewProduct = await productModel.create(productInfo);
    return createdNewProduct;
  }

  async getProductlist() {
    const products = await productModel.findAll();
    return products;
  }

  async getProductById(productId) {
    const product = await productModel.findById(productId);
    return product;
  }

  async setProduct(productId, toUpdate) {
    const product = await productModel.update(productId, toUpdate);
    return product;
  }

  async deleteProduct(productId) {
    const result = await productModel.deleteById(productId);
    return result;
  }
}

const productService = new ProductService();

export { productService };
