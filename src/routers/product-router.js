import { Router } from "express";
import { upload } from "../utils";
import { asyncHandler } from "../utils";
import { productService } from "../services";
import { loginRequired, adminRequired } from "../middlewares";

const productRouter = Router();
const productlistRouter = Router();

productRouter.post(
  "/register",
  loginRequired,
  adminRequired,
  upload.array("images"),
  asyncHandler(async function (req, res, next) {
    const { name, price, amount, category, description } = req.body;
    const newProduct = await productService.addProduct({
      name,
      price,
      amount,
      category,
      description,
      images: req.namelist.map((name) => `${req.imgPath}/${name}`),
    });
    res.status(201).json(newProduct);
  })
);

productRouter.get(
  "/:id",
  asyncHandler(async function (req, res, next) {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    res.status(201).json(product);
  })
);

productlistRouter.get(
  "/",
  asyncHandler(async function (req, res, next) {
    const products = await productService.getProductlist();
    res.status(201).json(products);
  })
);

export { productRouter, productlistRouter };
