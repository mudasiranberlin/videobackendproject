import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
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
        required:[true,"password is required"]
    },
    refreshToken:{
        type:String,

    }
},{timestamps:true})

Userschema.pre('save', async function (next) {
    if(this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password,10)
    next()
} )

Userschema.

export const User = mongoose.model("User",Userschema) 