import User from "../models/user.model.js";

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

    async getAllUsers() {
        /* 
            Obtiene todos los usuarios existentes
        */
        return await this.model.find({});
    }

    async update(id, user) {
        /* 
            Actualiza un usuario existente
            El parámetro id es el ID del usuario a actualizar
            El parámetro user es un objeto con los datos actualizados del usuario
        */
        return await this.model.findByIdAndUpdate(id, user, { new: true });
    }

    getUserByName(nombre) {
        /* 
            Obtiene un usuario existente por su nombre
            El parámetro name es el nombre del usuario a obtener
        */
        return this.model.findOne({ nombre });
    }

    getByEmail(email) {
        /* 
            Obtiene un usuario existente por su email
            El parámetro email es el email del usuario a obtener
        */
        return this.model.findOne({ email });
    }

    getByPhone(phone) {
        /* 
            Obtiene un usuario existente por su telefono
            El parámetro phone es el telefono del usuario a obtener
        */
        return this.model.findOne({ phone });
    }
}

const userRepository = new UserRepository();
export default userRepository;