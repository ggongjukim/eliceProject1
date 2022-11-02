import { Router } from "express";
import { asyncHandler } from "../utils";
import { orderService } from "../services";
import { loginRequired, adminRequired } from "../middlewares";

const orderRouter = Router();
const orderlistRouter = Router();

orderRouter.post(
  "/register",
  loginRequired,
  asyncHandler(async function (req, res, next) {
    const { user, list, receiver, phone, address, requirement, process } =
      req.body;

    const newOrder = await orderService.addOrder({
      user,
      list,
      receiver,
      phone,
      address,
      requirement,
      process,
    });

    res.status(201).json(newOrder);
  })
);

orderRouter.get(
  "/:orderId",
  loginRequired,
  asyncHandler(async function (req, res, next) {
    const { orderId } = req.params;
    const order = await orderService.getOrderById(orderId);
    res.status(201).json(order);
  })
);

orderlistRouter.get(
  "/",
  loginRequired,
  adminRequired,
  asyncHandler(async function () {
    const orders = await orderService.getOrderlist();
    res.status(201).json(orders);
  })
);

orderlistRouter.get(
  "/:userId",
  loginRequired,
  asyncHandler(async function () {
    const { userId } = req.params;
    const orders = orderService.getOrderlistByUserId(userId);
    res.status(201).json(orders);
  })
);

export { orderRouter, orderlistRouter };
