import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const ConnectDB = async () => {
    try {
        const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URI}/ ${DB_NAME}`)
       console.log(`Mongo Db Connected !! DB HOST ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log(`Error while Connecting mongodb`,error);
        process.exit(1)
    }
} 

export de