import mongoose from "mongoose";
import configuration from "../services/config";
const connect = new Promise<void>((resolve, reject) => {
    mongoose.connect(configuration.DB_URI, {
        dbName: configuration.DB_NAME
    }).then(() => {
        console.log("database connect");
        
        resolve();
    }).catch((error) => {
        console.error(error);
        reject();
    })
})

export default connect;