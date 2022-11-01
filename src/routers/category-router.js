import { Router } from "express";
import { asyncHandler } from "../utils";
import { categoryService } from "../services";
import { loginRequired, adminRequired } from "../middlewares";

const categoryRouter = Router();
const categorylistRouter = Router();

categoryRouter.post(
  "/register",
  loginRequired,
  adminRequired,
  asyncHandler(async function (req, res, next) {
    const { name } = req.body;
    const newCategory = await categoryService.addCategory({
      name,
    });
    res.status(201).json(newCategory);
  })
);

categorylistRouter.get(
  "/",
  asyncHandler(async function (req, res, next) {
    const categories = await categoryService.getCategorylist();
    res.status(201).json(categories);
  })
);

export { categoryRouter, categorylistRouter };