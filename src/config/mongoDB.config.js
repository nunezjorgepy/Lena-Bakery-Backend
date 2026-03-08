import mongoose from "mongoose";
import ENVIROMENT from "./enviroment.config.js";

async function connectToMongoDB() {
    try {
        await mongoose.connect(ENVIROMENT.MONGO_DB_CONNECTION_STRING);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

export default connectToMongoDB