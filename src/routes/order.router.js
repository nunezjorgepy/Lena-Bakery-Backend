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

// Deleting order by Id
orderRouter.delete(
    "/:id",
    orderController.deleteOrder
);

// Updating order status by Id
orderRouter.put(
    "/:id/status",
    orderController.updateOrderStatus
);

export default orderRouter;