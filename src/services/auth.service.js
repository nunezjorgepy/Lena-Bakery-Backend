import userRepository from "../repository/user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENVIRONMENT from "../config/environment.config.js";
import ServerError from "../helper/error.helper.js";
import mailerTransporter from "../config/mailer.config.js";


class AuthService {
    async registerUser(userData) {
        try {
            // TODO: Debería verificar que toda la data necesaria fue enviada, pero esto lo hago en otro momento con un middleware.
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

            // La contraseña se hashea en el modelo del usuario.
            
            // Generate verification_token. Esto podría ser una función aparte.
            const verificationToken = jwt.sign(
                { id: userData._id, email: userData.email },
                ENVIRONMENT.JWT_SECRET,
                { expiresIn: "24h" }
            );
            userData.verification_token = verificationToken;

            const user = await userRepository.create(userData);

            await this.sendVerificationEmail(user.email);

            return user;
        } catch (error) {
            throw error;
        }
    }

    async sendVerificationEmail(email) {
        try {
            const verify_email_token = jwt.sign(
                { email },
                ENVIRONMENT.JWT_SECRET,
                { expiresIn: "24h" }
            );

            const mailOptions = {
                from: 'Lena Bakery <no-reply@lenabakery.com>',
                to: email,
                subject: 'Verificación de correo electrónico',
                html: `
                    <h1> Verificación de correo electrónico</h1>
                    <p>Te has registrado en Lena Bakery. Por favor, verifica tu correo electrónico para confirmar tu cuenta. Haga clic en el siguiente enlace: <a href="${ENVIRONMENT.URL_BACKEND}/api/auth/verify-email?token=${verify_email_token}">Verificar correo</a></p>
                    <p>Si no has solicitado esta verificación, por favor, ignora este correo.</p>
                `,
            };

            await mailerTransporter.sendMail(mailOptions);
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