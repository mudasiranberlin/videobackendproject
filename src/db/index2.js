import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const ConnectDB = async () => {
    try {
        const connectionInstance= await mongoose.connect(`${process.env.MONGODB_}`)
        
    } catch (error) {
        console.log(`Error while Connecting mongodb`);
        
    }
} 