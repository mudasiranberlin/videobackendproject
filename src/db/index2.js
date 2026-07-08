import mongoose from "mongoose";
import express from "express"

const app = express()

(
    async()=>{
        try {
            await mongoose.connect(`${process.env.MONGODB_URI}/`)
        } catch (error) {
            
        }
    }
)()