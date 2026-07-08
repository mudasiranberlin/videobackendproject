import mongoose, {Schema} from "mongoose";
const Userschema = new Schema({},{timestamps:true})

export const User = mongoose.model("User",Userschema) 