import connectToMongoDB from "./config/mongoDB.config.js";
import ENVIROMENT from "./config/enviroment.config.js";
import express from "express";
import userRouter from "./routes/users.router.js";

const app = express();
app.use(express.json());

app.use("/api/users", userRouter);

connectToMongoDB();


app.listen(
    ENVIROMENT.PORT,
    () => console.log(`Server running on port ${ENVIROMENT.PORT}`)
)