import mongoose from "mongoose";
import { DB_NAME } from "../constants";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`The database is connected on port ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log("Error Cannot connect to Database",error);
        
    }
}