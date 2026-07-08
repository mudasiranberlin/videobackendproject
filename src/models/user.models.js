import mongoose from "mongoose";
const Userschema = new mongoose.Schema({},{timestamps})

export const User = mongoose.model("User",Userschema) 