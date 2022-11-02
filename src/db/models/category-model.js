import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('categories', CategorySchema);

export class CategoryModel {
    async findAllCategories() {
        const categories = await Category.find({});
        return categories;
    }
    async createCategory(name) {
        const createdCategory = await Category.create(name);
        return createdCategory;
    }
    async deleteCategory(name) {
        const deletedCategory = await Category.deleteOne(name);
        return deletedCategory;
    }
}

const categoryModel = new CategoryModel();

export { categoryModel };
