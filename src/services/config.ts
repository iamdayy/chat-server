import { config } from "dotenv";
import path from "path";
import { Config } from "../types";
config({path: path.resolve(__dirname, "../../prod.env") });

const configuration: Config = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    ENV: process.env.ENV,
    DB_URI: process.env.DB_URI,
    DB_NAME: process.env.DB_NAME,
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD,
    SECRET: process.env.SECRET,
};

export default configuration;