import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const  = async ()=>{
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`The DB is Connected and Host Name is ${connection.}`);
        
        
    } catch (error) {
        console.log("The error connecting the database")
    }

}


export default connectionInstance