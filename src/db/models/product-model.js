import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('products', ProductSchema);

export class ProductModel {
    async create(productInfo) {
        const createdNewProduct = await Product.create(productInfo);
        return createdNewProduct;
    }

    async findById(productId) {
        const product = await Product.findOne({ _id: productId });
        return product;
    }

    async findAll() {
        const product = await Product.find({});
        return product;
    }

    async update(productId, update) {
        const filter = { _id: productId };
        const option = { returnOriginal: false };

        const updatedProduct = await Product.findOneAndUpdate(filter, update, option);
        return updatedProduct;
    }

    async deleteById(productId) {
        const result = await Product.deleteOne({ _id: productId });
        return result;
    }
}

const productModel = new ProductModel();

export { productModel };
