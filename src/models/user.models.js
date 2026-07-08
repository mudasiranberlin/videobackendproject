import mongoose from "mongoose";
const Userschema = new mongoose.Schema({},{times})

export const User = mongoose.model("User",Userschema) 