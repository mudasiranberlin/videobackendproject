import mongoose from "mongoose";
import { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const UserSchema = new Schema({
    username:{
        type: String,
        required :true,
        trim : true,
        unique:true,
        required:true,
        index:true
    },
    email:{
        type: String,
        required :true,
        trim : true,
        unique:true,
        required:true,
        index:true
    },
    password:{
        type: String,
        required :true,
    }



},{timestamps:true})


UserSchema.methods()
export const User = mongoose.model("User",UserSchema)