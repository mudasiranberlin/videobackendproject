import mongoose from "mongoose";
import cors from "cors"
import cookieParser from "cookie-parser";
import express from "express"


 app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
 }))

 app.use(cookieParser())
 app.use(express.urlencoded({
    limit:"16kb"
 }))

 app.use(express.json({
    limit:"15kb",
    extended
 }))