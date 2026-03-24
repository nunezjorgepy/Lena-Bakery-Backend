import ENVIRONMENT from "../config/environment.config.js";
import jwt from "jsonwebtoken";
import ServerError from "../helper/error.helper.js";


function authMiddleware(req, res, next) {
    try {
        // Consigo el token, pero me quedo solamente con la última parte.
        const auth_header = req.headers.authorization;
        const auth_token = auth_header.split(" ")[1];
    
        // Si no hay token, no hay autorización
        if (!auth_token) {
            throw new ServerError("Token inválido", 401);
        }

        // Verifico que el token sea válido
        const payload = jwt.verify(auth_token, ENVIRONMENT.JWT_SECRET);

        // Agrego el payload al request
        req.user = payload;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            throw new ServerError("Token inválido", 401);
        }
        throw error;
    }
}

export default authMiddleware;
