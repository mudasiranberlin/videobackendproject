import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema({
    username:{
        type: String,
        required :true,
        trim : true,
        unique:true,
        required:true
        index
    },


},{timestamps:true})

export const User = mongoose.model("User",UserSchema)