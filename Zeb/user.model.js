import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    username:{
        type: String,
        required:true,
        unique:true,
        bollean:false,
        

    }

},{timestamps:true})

export const User = mongoose.model("User",UserSchema)