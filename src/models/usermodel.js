import mongoose from "mongoose";

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
    }
    username:{
        type:String,
        lowercase:true,
        unique:true,
        required:true,
        trim:true,
        index:true
    },





},{timestamps:true})


export const User = mongoose.model("User",Userschema);