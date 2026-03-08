import dotenv from "dotenv";

dotenv.config();

const ENVIROMENT = {
    MONGO_DB_CONNECTION_STRING: process.env.MONGO_DB_CONNECTION_STRING,
    PORT: process.env.PORT,
}

export default ENVIROMENT