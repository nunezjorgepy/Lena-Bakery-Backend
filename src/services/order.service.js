import ServerError from "../helper/error.helper.js";
import orderRepository from "../repository/order.repository.js";


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

    // Comento las funciones que no se usan por ahora
/*     async getOrdersByStatus(status) {
        try {
            const orders = await orderRepository.getOrdersByStatus(status);
            return orders;
        } catch (error) {
            throw error;
        }
    } */

/*     async getOrderById(id) {
        try {
            const order = await orderRepository.getOrder(id);
            return order;
        } catch (error) {
            throw error;
        }
    } */

/*     async updateOrder(id, orderData) {
        try {
            const orderUpdated = await orderRepository.update(id, orderData);
            return orderUpdated;
        } catch (error) {
            throw error;
        }
    } */

/*     async deleteOrder(id) {
        try {
            const orderDeleted = await orderRepository.delete(id);
            return orderDeleted;
        } catch (error) {
            throw error;
        }
    } */
}

const orderService = new OrderService();
export default orderService;