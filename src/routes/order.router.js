import express from "express";
import orderController from "../controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.post(
    "/",
    orderController.createOrder
);

orderRouter.get(
    "/",
    orderController.getAllOrders
);

export default orderRouter;