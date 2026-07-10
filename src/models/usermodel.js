import mongoose from "mongoose";
import bycrpt from "bcrypt"
import jwt from "jsonwebtoken"

const Userschema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        
    }
},{timestamps:true})

export const User = mongoose.model("User",Userschema)