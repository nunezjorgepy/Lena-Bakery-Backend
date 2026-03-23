import mongoose from "mongoose";
import ServerError from "../helper/error.helper.js";
import orderRepository from "../repository/order.repository.js";
import { ORDER_STATUS_OPTIONS } from "../config/orderStatus.config.js";


class OrderService {
    async createOrder(orderData) {
        try {
            // TODO: faltan las validaciones. Si bien ya tengo las validaciones de que no sea vacío, falta que sea correcto.
            /* 
                Seguramente las validaciones de los items se pueden hacer con un schema de joi.
                Lo mismo con el purchase_summary.
                Lo mismo con el name, phone y address.
            */

            const {items, purchase_summary, name, phone, address} = orderData;

            if (!items || items.length === 0) {
                // TODO: Creo que faltan algunas validaciones acá, por ejemplo, que el subtotal sea correcto.
                throw new ServerError("Items no proporcionados", 400);
            }

            if (!purchase_summary) {
                // TODO: Creo que faltan algunas validaciones acá, por ejemplo, que el subtotal sea correcto.
                throw new ServerError("Resumen de compra no proporcionado", 400);
            }

            if (!name) {
                throw new ServerError("Nombre no proporcionado", 400);
            }

            if (!phone) {
                throw new ServerError("Teléfono no proporcionado", 400);
            }

            if (!address) {
                throw new ServerError("Dirección no proporcionada", 400);
            }

            const order = await orderRepository.create(orderData);
            return order;
        } catch (error) {
            throw error;
        }
    }

    async getAllOrders() {
        try {
            /* 
                TODO: implementar sistema de posibles errores. Los posibles errores son:
                    - role !== "admin": no tiene permiso para ver todas las ordenes.
                    - token expirado: 
                    - token inválido: 
                Por ahora, esos son todos, aunque más adelante estaría bueno implementar errores de Base de Datos (en deepseek hay más info sobre esto).
            */
            const orders = await orderRepository.getAllOrders();
            return orders;
        } catch (error) {
            throw error;
        }
    }

    async getOrderById(id) {
        try {
            /* 
                TODO: faltan unas cuantas verificaciones, pero todavía no entiendo cómo implementarlas.
            */
            if (!id) {
                throw new ServerError("ID no proporcionado", 400);
            }

            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new ServerError("ID inválido", 400);
            }

            const order = await orderRepository.getOrderById(id);

            if (!order) {
                throw new ServerError("Orden no encontrada", 404);
            }

            return order;
        } catch (error) {
            throw error;
        }
    }

    async getOrdersByStatus(status) {
        try {
            /* 
                TODO: faltan unas cuantas verificaciones, pero todavía no entiendo cómo implementarlas.
            */
            if (!status) {
                throw new ServerError("Estado no proporcionado", 400);
            }

            if (!ORDER_STATUS_OPTIONS.includes(status)) {
                throw new ServerError("Estado inválido", 400);
            }

            const orders = await orderRepository.getOrdersByStatus(status);
            return orders;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteOrder(id) {
        try {
            /* 
                TODO: faltan unas cuantas verificaciones, pero todavía no entiendo cómo implementarlas.
                Por ahora, esos son todos, aunque más adelante estaría bueno implementar errores de Base de Datos (en deepseek hay más info sobre esto).
                Comentario adicional: 
                    - No verifico si el estado es entregado ya que es posible que se quiera eliminar una orden que fue cancelada o rechazada. Esto lo hago en el frontend.
            */
            if (!id) {
                throw new ServerError("ID no proporcionado", 400);
            }

            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new ServerError("ID inválido", 400);
            }

            const order = await orderRepository.getOrderById(id);

            if (!order) {
                throw new ServerError("Orden no encontrada", 404);
            }

            const orderDeleted = await orderRepository.deleteById(id);
            return orderDeleted;
        } catch (error) {
            throw error;
        }
    }

    async updateOrderStatus({id, status}) {
        try {
            if (!id) {
                throw new ServerError("ID no proporcionado", 400);
            }

            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new ServerError("ID inválido", 400);
            }

            if (!status) {
                throw new ServerError("Estado no proporcionado", 400);
            }

            if (!ORDER_STATUS_OPTIONS.includes(status)) {
                throw new ServerError("Estado inválido", 400);
            }

            const order = await orderRepository.getOrderById(id);

            if (!order) {
                throw new ServerError("Orden no encontrada", 404);
            }

            const orderUpdated = await orderRepository.updateStatus({id, status});
            return orderUpdated;
        } catch (error) {
            throw error;
        }
    }
    // Comento las funciones que no se usan por ahora

/*     async updateOrder(id, orderData) {
        try {
            const orderUpdated = await orderRepository.update(id, orderData);
            return orderUpdated;
        } catch (error) {
            throw error;
        }
    } */


}

const orderService = new OrderService();
export default orderService;