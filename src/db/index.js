import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const  connectDB= async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`The DB is Connected and Host Name is ${connectionInstance.}`);
        
        
    } catch (error) {
        console.log("The error connecting the database")
    }

}


export default connectionInstance