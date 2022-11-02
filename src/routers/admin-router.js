import express, { Router } from 'express';
import path from 'path';
import is from '@sindresorhus/is';
import { categoryService } from '../services';

const adminRouter = express.Router(); // admin/ 시작

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

export { adminRouter };
