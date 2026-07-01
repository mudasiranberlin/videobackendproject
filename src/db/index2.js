import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const connectDB= async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env}`) 
        
    } catch (error) {
        console.log();
    }
}