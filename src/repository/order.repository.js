import Order from "../models/order.model.js";
/* 
    La orden tiene los siguientes métodos:
        - create
        - updateById
        - updateState
        - deleteById
        - searchByStatus
*/

class OrderRepository {
    constructor() {
        this.model = Order;
    }

    async create(order) {
        /* 
            Crea una nuevo orden
            order es un objeto con los datos de la nueva orden
        */
        return await this.model.create(order);
    }

    async updateById({id, orderData}) {
        return await this.model.findByIdAndUpdate(id, orderData, { returnDocument: 'after' });
    }

    async updateStatus({id, status}) {
        /* 
            Actualiza el estado de una orden existente
            id es el ID de la orden a actualizar
            status es el nuevo estado de la orden
        */
        return await this.model.findByIdAndUpdate(id, { status }, { returnDocument: 'after' });
    }

    async deleteById(id) {
        /* 
            Elimina una orden existente
            id es el ID de la orden a eliminar
            OJO: esto es un borrado físico. No se puede deshacer. Solamente se debe permitir si el status es entregado.
        */
        return await this.model.findByIdAndDelete(id);
    }

    async getAllOrders() {
        /* 
            Busca todas las ordenes
        */
        return await this.model.find();
    }

    async getOrderById(id) {
        /* 
            Busca una orden por ID
            id es el ID de la orden a buscar
        */
        return await this.model.findById(id);
    }

    async getOrdersByStatus(status) {
        return await this.model.find({ status });
    }


}


const orderRepository = new OrderRepository();

export default orderRepository;