import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    username:{
        type: String,
        required:true,
        unique:true,
        lowercase:true
    }
    pass

},{timestamps:true})

export const User = mongoose.model("User",UserSchema)