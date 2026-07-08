import mongoose from "mongoose";
import cors from "cors"
import cookieParser from "cookie-parser";


 app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
 }))

 app.use(cookieParser())
 app.use()