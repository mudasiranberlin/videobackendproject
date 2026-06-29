import mongoose from "mongoose";
import { DB_NAME } from "./constants";

import express from "express"

const app = express();


( async (params) => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",()=>{
            console.log("errr",error);
            throw error
        })
        
        app.listen(process.env.PORT,()=>{
            console.log(`APP is Listening `${});
            
        })


    } catch (error) {
        console.error("ERROR",error)
        
    }
})()