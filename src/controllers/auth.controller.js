import ServerError from "../helper/error.helper.js";
import authService from "../services/auth.service.js";

class AuthController {
    async register(req, res) {
        const userData = req.body;

        try {

            await authService.registerUser(userData);

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
            /* 
                Consultar si es mejor usar select:false en el modelo o si es mejor usar select:false en el query.
                Por ahora lo dejo en el query.
            */
            const {user, login_token} = await authService.loginUser({email, password});

            // Si lo encuentro y la contraseña es correcta, devolver un 200
            return res.status(200).json({
                message: "Usuario logueado con éxito",
                status: 200,
                data: {
                    login_token
                }
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

    async verifyEmail(req, res) {
        const { verification_token } = req.query;

        try {
            await authService.verifyEmail({ verification_token });

            return res.status(200).send("Email verificado con éxito");
        } catch (error) {
            console.log(error);
            if (error instanceof ServerError) {
                return res.status(error.status).json({
                    ok: false,
                    message: error.message,
                    status: error.status
                })
            }

            return res.status(500).json({
                ok: false,
                message: "Error al verificar email",
                status: 500
            })
        }
    }
}

const authController = new AuthController();
export default authController