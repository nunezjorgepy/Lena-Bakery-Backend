import orderRepository from "../repository/order.repository.js";

class OrderController {

    async createOrder(req, res) {
        const order = req.body;

        try {
            const orderCreated = await orderRepository.create(order);
            return res.status(200).json({
                message: "Order created successfully",
                status: 200,
                data: {
                    orderCreated
                }
            });
        } catch (error) {
            if (error instanceof ServerError) {
                return res.status(error.status).json({
                    message: error.message,
                    status: error.status
                })
            }

            console.log(error);
            return res.status(500).json({
                message: "Error creating order",
                status: 500
            })
        }
    }

    async getAllOrders(req, res) {
        try {
            const orders = await orderRepository.getAllOrders();
            return res.status(200).json({
                message: "Orders retrieved successfully",
                status: 200,
                data: {
                    orders
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Error retrieving orders",
                status: 500
            })
        }
    }

    async getOrdersByStatus(req, res) {
        const { status } = req.params;

        try {
            const orders = await orderRepository.getOrdersByStatus(status);
            return res.status(200).json({
                message: "Orders retrieved successfully",
                status: 200,
                data: {
                    orders
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Error retrieving orders",
                status: 500
            })
        }
    }

    async getOrderById(req, res) {
        const { id } = req.params;

        try {
            const order = await orderRepository.getOrder(id);
            return res.status(200).json({
                message: "Order retrieved successfully",
                status: 200,
                data: {
                    order
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Error retrieving order",
                status: 500
            })
        }
    }

    async updateOrder(req, res) {
        const { id } = req.params;
        const order = req.body;

        try {
            const orderUpdated = await orderRepository.update(id, order);
            return res.status(200).json({
                message: "Order updated successfully",
                status: 200,
                data: {
                    orderUpdated
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Error updating order",
                status: 500
            })
        }
    }

    async deleteOrder(req, res) {
        const { id } = req.params;

        try {
            const orderDeleted = await orderRepository.delete(id);
            return res.status(200).json({
                message: "Order deleted successfully",
                status: 200,
                data: {
                    orderDeleted
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Error deleting order",
                status: 500
            })
        }
    }

}

const orderController = new OrderController();
export default orderController;