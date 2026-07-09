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
    fullname:{
        type:String,
        trim:true,
        index:true,
        required:true,
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

Userschema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password)
}

Userschema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id : this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname // this one is comming from database this.fullname
    },
    process.env.ASSESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ASSESS_TOKEN_EXPIRY,
        
    })
    
} 
Userschema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id : this._id // this one is comming from database this.fullname
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
        
    })
    
} 

export const User = mongoose.model("User",Userschema) 


import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

Userschema.pre("save",async function (next) {
    if(!this.isModified("password")) return next()
    this.password = bcrypt.hash(this.password,10)
    next()
})
Userschema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password)
    
}

Userschema.methods.generateAccessToken( function);