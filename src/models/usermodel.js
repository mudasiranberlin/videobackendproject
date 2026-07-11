import mongoose from "mongoose";

const Userschema = new mongoose.Schema({

    username:{
        
    }





},{timestamps:true})


export const User = mongoose.model("User",Userschema);