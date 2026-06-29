import mongoose from "mongoose";
// This imports the Mongoose library so you can connect to MongoDB.
import { DB_NAME } from "../constants";



const  connectDB= async ()=>{

/* You're creating a function named connectDB. It is not running yet.It only runs when you call:connectDB(); */

try { /*
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`The DB is Connected and Host Name is ${connectionInstance.connection.host}`);
        
        
    } catch (error) {
        console.log("The error connecting the database")
        process.exit(1)
    }

}


export default connectDB