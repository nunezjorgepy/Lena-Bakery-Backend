import connectToMongoDB from "./config/mongoDB.config.js";
import ENVIROMENT from "./config/enviroment.config.js";
import express from "express";

const app = express();

/* connectToMongoDB();


app.listen(
    ENVIROMENT.PORT,
    () => console.log(`Server running on port ${ENVIROMENT.PORT}`)
) */