import mongoose from "mongoose";
import { DB_NAME } from "./constants";


( async (params) => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        
    } catch (error) {
        console.error("ERROR",error)
        
    }
})()