import connectToMongoDB from "./config/mongoDB.config.js";
import ENVIROMENT from "./config/enviroment.config.js";
import express from "express";
import userRouter from "./routes/users.router.js";
import authRouter from "./routes/auth.router.js";

const app = express();
app.use(express.json());

app.use("/api/users", userRouter);
app.use('/api/auth', authRouter);

connectToMongoDB();


app.listen(
    ENVIROMENT.PORT,
    () => console.log(`Server running on port ${ENVIROMENT.PORT}`)
)