import QAndA from "../models/Q&A.model";

class QAndARepository {
    constructor() {
        this.model = QAndA;
    }

    async create(question) {
        /* 
            Crea una nueva pregunta
            question es un objeto con los datos de la nueva pregunta
        */
        return await this.model.create(question);
    }

    async updateById(id, question) {
        /* 
            Actualiza una pregunta existente
            id es el ID de la pregunta a actualizar
            question es un objeto con los datos actualizados de la pregunta
        */
        return await this.model.findByIdAndUpdate(id, question, { new: true });
    }

    async softDelete(id) {
        // Borrado lógico. Al no estar activo, no se muestr en la página, pero se puede recuperar.
        return await this.model.findByIdAndUpdate(id, { isActive: false }, { new: true });
    }

    async deleteById(id) {
        /* 
            Elimina una pregunta existente
            id es el ID de la pregunta a eliminar
            OJO: esto es un borrado físico. No se puede deshacer
        */
        return await this.model.findByIdAndDelete(id);
    }
}