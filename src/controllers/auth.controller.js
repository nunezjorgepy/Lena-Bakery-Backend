import ServerError from "../helper/error.helper.js";
import userRepository from "../repository/user.repository.js";

class AuthController {
    async register(req, res) {
        const user = req.body;
        console.log(user);

        try {

            /* Buscar al usuario por email y, si existe, devolver un error con status 400 */
            const userByEmail = await userRepository.getByEmail(user.email);
            if (userByEmail) {
                throw new ServerError("Email ya registrado", 400);
            }

            /* Ahora lo mismo, pero por telefono */
            const userByPhone = await userRepository.getByPhone(user.telefono);
            if (userByPhone) {
                console.log(userByPhone);
                throw new ServerError("Teléfono ya registrado", 400);
            }

            // Si no existe usuario con ese mail o telefono, crearlo
            await userRepository.create(user);
            return res.status(201).json({
                ok: true,
                message: "Usuario creado con éxito",
                status: 201,
            });
        } catch (error) {
            if (error instanceof ServerError) {
                return res.status(error.status).json({
                    ok: false,
                    message: error.message,
                    status: error.status
                })
            }

            console.log(error);
            return res.status(500).json({
                ok: false,
                message: "Error al crear usuario",
                status: 500
            })
        }
    }

    async login(req, res) {
        const {email, password} = req.body;

        try {
            // Buscar al usuario por email
            const userFound = await userRepository.getByEmail(email);

            // Si no lo encuentro, devolver un error
            if (!userFound) {
                throw new ServerError("Email o password incorrecto", 404);
            }

            // Si lo encuentro, verificar la contraseña
            if (userFound.password !== password) {
                throw new ServerError("Email o password incorrecto", 401);
            }

            // Si lo encuentro y la contraseña es correcta, devolver un 200
            return res.status(200).json({
                message: "Usuario logueado con éxito",
                status: 200,
            });
            
            
        } catch (error) {
            if (error instanceof ServerError) {
                return res.status(error.status).json({
                    ok: false,
                    message: error.message,
                    status: error.status
                })
            }

            console.log(error);
            return res.status(500).json({
                ok: false,
                status: 500,
                message: "Error al loguearse",
            })
        }
    }
}

const authController = new AuthController();
export default authController