/* 
    Contiene los posibles valores de los estados de un pedido.
*/

export const ORDER_STATUS = {
    PENDING: "pendiente",
    PREPARING: "preparando",
    PREPARED: "preparado",
    SENDING: "enviando",
    DELIVERED: "entregado",
    CANCELLED: "cancelado",
    REJECTED: "rechazado"
};

export const ORDER_STATUS_OPTIONS = Object.values(ORDER_STATUS);

export default { ORDER_STATUS, ORDER_STATUS_OPTIONS };