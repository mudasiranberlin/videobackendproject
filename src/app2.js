import mongoose from "mongoose";
import express from "express";
import connectDB from "./db";

const app = express()

connectDB()
.then( ()=>{
app.listen(process.env.PORT||8080,())
} )
.catch( ()=>{

} )
