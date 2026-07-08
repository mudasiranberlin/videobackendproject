import mongoose from "mongoose";
const Userschema = new mongoose.Schema({},{t})

export const User = mongoose.model("User",Userschema) 