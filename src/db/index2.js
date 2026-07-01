import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const connectDB= async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGOOSE_URL}/${DB_NAME}`) 
        console.log(`\n MongoDB Connected !! DB HOST: ${connectionInstance}`);
        
    } catch (error) {
        console.log("Mongo db connection error",error);
        process.exit
    }
}