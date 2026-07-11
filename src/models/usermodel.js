import mongoose from "mongoose";
import bycrpt from "bcrypt"
import jwt from "jsonwebtoken"
import mongooseAggerate from "mongoose-a"
import mongoose from "mongoose-paginate-v2";

const Userschema = new mongoose.Schema({

    username:{
        type:String,
        lowercase:true,
        unique:true,
        required:true,
        trim:true,
        index:true
    },
    password:{
        type:String,
        required:true
    },
    fullname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        lowercase:true,
        unique:true,
        required:true,
        trim:true,
        index:true
    },







},{timestamps:true})


export const User = mongoose.model("User",Userschema);