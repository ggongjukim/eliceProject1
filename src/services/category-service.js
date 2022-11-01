import { categoryModel } from "../db";

class CategoryService {
  async addCategory(categoryInfo) {
    const createdNewProduct = await categoryModel.create(categoryInfo);
    return createdNewProduct;
  }

  async getCategorylist() {
    const categories = await categoryModel.findAll();
    return categories;
  }

  async getCategoryById(categoryId) {
    const category = await categoryModel.findById(categoryId);
    return category;
  }
}

const categoryService = new CategoryService();

export { categoryService };
