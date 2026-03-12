import userRepository from "../repository/user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENVIRONMENT from "../config/environment.config.js";
import ServerError from "../helper/error.helper.js";


class AuthService {
    async registerUser(userData) {
        try {
            /* Buscar al usuario por email y, si existe, devolver un error con status 400 */
            const userByEmail = await userRepository.getByEmail(userData.email);
            if (userByEmail) {
                throw new ServerError("Email ya registrado", 400);
            }

            /* Ahora lo mismo, pero por telefono */
            const userByPhone = await userRepository.getByPhone(userData.phone);
            if (userByPhone) {
                throw new ServerError("Teléfono ya registrado", 400);
            }

            // Hash the password
            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(userData.password, salt);
            userData.password = hashedPassword;

            const user = await userRepository.create(userData);

            return user;
        } catch (error) {
            throw error;
        }
    }

    async loginUser(userData) {
        try {
            // Find the user by email
            const user = await userRepository.getByEmail(userData.email).select("+password");

            // If the user is not found, throw an error
            if (!user) {
                throw new ServerError("Usuario no encontrado");
            }

            // Compare the password
            const isPasswordValid = await bcrypt.compare(userData.password, user.password);
            if (!isPasswordValid) {
                throw new ServerError("Contraseña incorrecta");
            }

            user.password = undefined;

            // Generate a token
            const token = jwt.sign({ id: user._id }, ENVIRONMENT.JWT_SECRET, { expiresIn: "1h" });
            return { user, token };
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;