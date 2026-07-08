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
        type:String
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        required:true,
        unique:true,
        
    }







},{timestamps:true})
export const User = mongoose.model("User",Userschema) 