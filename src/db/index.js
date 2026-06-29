import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const connectionInstance = async ()=>{
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`The DB is Connected and Host Name is $`);
        
        
    } catch (error) {
        console.log("The error connecting the database")
    }

}


export default connectionInstance