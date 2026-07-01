import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const ConnectDB = async () => {
    try {
        const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URI}/ ${DB_NAME}`)
       console.log(~);
        
    } catch (error) {
        console.log(`Error while Connecting mongodb`);
        
    }
} 