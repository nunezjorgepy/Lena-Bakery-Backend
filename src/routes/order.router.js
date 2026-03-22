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

// Getting order by Id
orderRouter.get(
    "/:id",
    orderController.getOrderById
);

// Getting orders by status
orderRouter.get(
    "/status/:status",
    orderController.getOrdersByStatus
);

export default orderRouter;