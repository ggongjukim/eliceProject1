import express, { Router } from 'express';
import path from 'path';
import is from '@sindresorhus/is';
import { categoryService, productService } from '../services';
import { upload } from '../utils/upload';

const adminRouter = express.Router();

// 카테고리 전체조회
adminRouter.get('/categories', async (req, res, next) => {
    try {
        const categories = await categoryService.getCategories();
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
});

// 카테고리 생성
adminRouter.post('/categories', async (req, res, next) => {
    try {
        const { categoryName: name } = req.body;
        const createdCategory = await categoryService.createCategory({ name });
        res.status(201).json(createdCategory);
    } catch (error) {
        next(error);
    }
});

// 카테고리 삭제
adminRouter.delete('/categories/:name', async (req, res, next) => {
    const { name } = req.params;

    try {
        const deleteCategory = await categoryService.deleteCategory({ name });
        res.json(deleteCategory);
    } catch (error) {
        next(error);
    }
});

// 상품 전체 조회
adminRouter.get('/products', async (req, res, next) => {
    try {
        const products = await productService.findAllProducts();
        req.status(200).json(products);
    } catch (error) {
        next(error);
    }
});

// 상품 생성
// 카테고리쪽 모델 잘못됨 PR
adminRouter.post('/products', upload.single('image'), async (req, res, next) => {
    try {
        const { name, price, category, description } = req.body;
        const categoryId = await categoryService.getCategoryId(category);
        const createdProduct = await productService.addProduct({
            name,
            price,
            category: categoryId,
            description,
            images: [req.file.path],
        });

        res.status(201).json('success');
    } catch (error) {
        next(error);
    }
});

export { adminRouter };
