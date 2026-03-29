import connectToMongoDB from "./config/mongoDB.config.js";
import ENVIRONMENT from "./config/environment.config.js";
import express from "express";
import userRouter from "./routes/users.router.js";
import authRouter from "./routes/auth.router.js";
import productRouter from "./routes/product.router.js";
import orderRouter from "./routes/order.router.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

// Ruta provisoria para probar el authMiddleware
app.get(
    "/api/test", 
    authMiddleware, 
    (req, res) => {
        const { user } = req.user;
        res.json({ message: `Hola ${user.name}. Tenes autorización para acceder a esta ruta. Tu rol es ${user.role}.` });
    }
);

connectToMongoDB();

app.listen(
    ENVIRONMENT.PORT,
    () => console.log(`Server running on port ${ENVIRONMENT.PORT}`)
)