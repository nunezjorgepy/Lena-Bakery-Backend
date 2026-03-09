import userRepository from "../repository/user.repository.js";

class UserController {
    async createUser(req, res) {
        const user = req.body;

        try {
            const userCreated = await userRepository.create(user);
            return res.status(201).json({
                message: "User created successfully",
                status: 201,
                data: {
                    userCreated
                }
            });
        } catch (error) {
            /* TODO: revisar si el error es correcto */
            console.log(error);
            return res.status(500).json({
                message: "Error creating user",
                status: 500
            })
        }
    }

    async getAllUsers(req, res) {
        /* 
            Probablemente no sea necesaria.
        */
        try {
            const users = await userRepository.getAllUsers();
            return res.status(200).json({
                message: "Users retrieved successfully",
                status: 200,
                data: {
                    users
                }
            });
        } catch (error) {
            /* TODO: revisar si el error es correcto */
            console.log(error);
            return res.status(500).json({
                message: "Error retrieving users",
                status: 500
            })
        }
    }

    async getUserById(req, res) {
        const { id } = req.params;

        try {
            const user = await userRepository.getUser(id);
            return res.status(200).json({
                message: "User retrieved successfully",
                status: 200,
                data: {
                    user
                }
            });
        } catch (error) {
            /* TODO: revisar si el error es correcto */
            console.log(error);
            return res.status(500).json({
                message: "Error retrieving user",
                status: 500
            })
        }
    }

    async updateUser(req, res) {
        /* TODO: no debería permitir actualizar el password. En deepseek tengo un endpoint para eso. Buscar como "Separar endpoint cambio contrasena" */
        const { id } = req.params;
        const user = req.body;

        try {
            const userUpdated = await userRepository.update(id, user);
            return res.status(200).json({
                message: "User updated successfully",
                status: 200,
                data: {
                    userUpdated
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Error updating user",
                status: 500
            })
        }
    }

}

const userController = new UserController();
export default userController;