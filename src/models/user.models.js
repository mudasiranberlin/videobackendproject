import mongoose, {Schema} from "mongoose";
const Userschema = new Schema({
    username:{
        type:String,
        lowercase:true,
        trim:true,
        index:true,
        required:true,
        unique:true
    },
    email:{
        type:String,
        lowercase:true,
        trim:true,
        index:true,
        required:true,
        unique:true
    },
    avatar:{
        type:String,
        required:true
    },
    coverImage:{
        type:str
    }






},{timestamps:true})
export const User = mongoose.model("User",Userschema) 