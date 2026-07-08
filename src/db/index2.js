import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        console.log(`Database has been connected at the port ${connectionInstance.connection.por}`);
        
        
    } catch (error) {
        console.log("Failed to connect the database :",error);
        
    }
    
}