import mongoose, {Schema} from "mongoose";
const Userschema = new Schema({},{timestamps:true})

username:{
    type:String,
    lowercase: true
}

export const User = mongoose.model("User",Userschema) 