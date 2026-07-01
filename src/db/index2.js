import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const connectDB= async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGOOSE_URL}/$`) 
        
    } catch (error) {
        console.log();
    }
}