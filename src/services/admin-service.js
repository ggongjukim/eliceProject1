import { categoryModel, productModel } from '../db';

//카테고리
class CategoryService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }

    // 카테고리 전체 조회
    async getCategories() {
        const categories = await this.categoryModel.findAllCategories();
        return categories;
    }

    // 카테고리 생성
    async createCategory(categoryName) {
        const createdCategory = await this.categoryModel.createCategory(categoryName);
        return createdCategory;
    }

    // 카테고리 삭제
    async deleteCategory(categoryName) {
        const deletedCategory = await this.categoryModel.deleteCategory(categoryName);
        return deletedCategory;
    }
}

const categoryService = new CategoryService(categoryModel);

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

export { categoryService, productService };
