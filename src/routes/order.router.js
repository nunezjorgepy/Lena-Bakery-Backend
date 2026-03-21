import express from "express";
import orderController from "../controllers/order.controller.js";

const OrderRouter = express.Router();

OrderRouter.post(
    "/",
    orderController.createOrder
);

export default OrderRouter;