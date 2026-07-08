import mongoose, {Schema} from "mongoose";
const Userschema = new mongoose.Schema({},{timestamps:true})

export const User = mongoose.model("User",Userschema) 