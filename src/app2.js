import mongoose from "mongoose";
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
   origin:"CORS_ORIGIN",
   credentials:true
}))