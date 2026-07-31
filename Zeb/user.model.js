import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    username:{
        type: String,
        required:true,
        unique:true,
        loer


    }

},{timestamps:true})

export const User = mongoose.model("User",UserSchema)