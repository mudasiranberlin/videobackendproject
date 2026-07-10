import mongoose from "mongoose";
import bycrpt from "bcrypt"
import jwt from "jsonwebtoken"

const Userschema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true,
        index:true
    }
},{timestamps:true})

schema.pre('save', async function() {
  await doStuff();
  await doMoreStuff();
});

export const User = mongoose.model("User",Userschema)