import mongoose from "mongoose";
import express from "express"
import { DB_NAME } from "../constants";

const app = express()

(
    async()=>{
        try {
            await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
            console.log(`Mongo db connected`);
            app.listen(requestAnimationFrame,res)
            
        } catch (error) {
            console.log("Not able to connect the database",error);
            
            
        }
    }
)()