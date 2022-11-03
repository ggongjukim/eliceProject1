import { Router } from "express";
import { upload } from "../utils";
import { asyncHandler } from "../utils";
import { productService, categoryService } from "../services";
import { loginRequired, adminRequired } from "../middlewares";

const productRouter = Router();
const productlistRouter = Router();

productRouter.post(
  "/register",
  loginRequired,
  adminRequired,
  upload.array("images"),
  asyncHandler(async function (req, res, next) {
    if (!req.namelist || req.namelist.length === 0) {
      throw new Error("상품 이미지가 필요합니다");
    }

    if (req.fileValidationError) {
      throw new Error(req.fileValidationError);
    }
    const { name, price, category, description } = req.body;
    const newProduct = await productService.addProduct({
      name,
      price,
      category,
      description,
      images: req.namelist.map((name) => `/${name}`),
    });
    res.status(201).json(newProduct);
  })
);

productRouter.patch(
  "/:productId",
  loginRequired,
  adminRequired,
  asyncHandler(async function (req, res, next) {
    const { productId } = req.params;
    const { name, price, category, description } = req.body;

    const toUpdate = {
      ...(name && { name }),
      ...(price && { price }),
      ...(category && { category }),
      ...(description && { description }),
    };

    const updatedProductInfo = await productService.setProduct(
      productId,
      toUpdate
    );

    res.status(200).json(updatedProductInfo);
  })
);

productRouter.delete(
  "/:productId",
  loginRequired,
  adminRequired,
  asyncHandler(async function (req, res, next) {
    const { productId } = req.params;
    const result = await productService.deleteProduct(productId);
    res.status(201).json(result);
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
    // 카테고리 확인
    let category;
    if (!!category) {
      const rsp = await categoryService.getCategoryByName(req.query.category);
      if (!rsp) {
        throw new Error("존재하지 않는 카테고리 입니다");
      }
      category = rsp._id;
    }

    //페이지네이션
    const page = Number(req.query.page || 1); // url 쿼리에서 page 받기, 기본값 1
    const perPage = Number(req.query.perPage || 10); // url 쿼리에서 perPage 받기, 기본값 10

    const filter = {
      ...(category && { category }),
    };
    const products = await productService.getProductlist(filter, page, perPage);
    res.status(201).json(products);
  })
);

export { productRouter, productlistRouter };
