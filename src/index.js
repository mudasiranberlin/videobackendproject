import mongoose from "mongoose";
import { DB_NAME } from "./constants";

import express from "express"

const app = express();


( async (params) => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("e")
        
    } catch (error) {
        console.error("ERROR",error)
        
    }
})()