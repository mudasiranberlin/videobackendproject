import mongoose from "mongoose";

const Userschema = new mongoose.Schema({

    username:{
        type:String,
        lowercase:true,
        unique:true,
        required:treu
    }





},{timestamps:true})


export const User = mongoose.model("User",Userschema);