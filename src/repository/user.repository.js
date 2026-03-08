import User from "../models/user.model";

class UserRepository {
    constructor() {
        this.model = User;
    }

    async create(user) {
        /* 
            Crea un nuevo usuario
            El parámetro user es un objeto con los datos del nuevo usuario
        */
        return await this.model.create(user);
    }
    
    async getUser(id) {
        /* 
            Obtiene un usuario existente
            El parámetro id es el ID del usuario a obtener
        */
        return await this.model.findById(id);
    }

    async update(id, user) {
        /* 
            Actualiza un usuario existente
            El parámetro id es el ID del usuario a actualizar
            El parámetro user es un objeto con los datos actualizados del usuario
        */
        return await this.model.findByIdAndUpdate(id, user, { new: true });
    }
}

const userRepository = new UserRepository();
export default userRepository;