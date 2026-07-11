import mongoose from "mongoose";

const Userschema = new mongoose.Schema({

    username:{
        type:String,
        lowercase:true,
        unique:true,
        
    }





},{timestamps:true})


export const User = mongoose.model("User",Userschema);