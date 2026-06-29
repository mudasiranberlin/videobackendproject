import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const connectionInstance = async ()=>{
    try {
        await mongoose.connect(`${process.env}`)
        
    } catch (error) {
        console.log("The error connecting the database")
    }

}


export default connectionInstance