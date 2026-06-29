import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const  connectDB= async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`The DB is Connected and Host Name is ${connectionInstance.connection.host}`);
        
        
    } catch (error) {
        console.log("The error connecting the database")
        process
    }

}


export default connectionInstance