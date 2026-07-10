import mongoose from "mongoose";
import bycrpt from "bcrypt"
import jwt from "jsonwebtoken"

const Userschema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true,
        index:true
    }
},{timestamps:true})

Userschema.pre('save', async function(next) {
    if (this.isModified("password"))  return next()
     this.password= await bcrypt.hash(this.password, 10) 
});

Userschema.methods.generateaccesstoken = function () {
    return jwt.sign({
        _id:this._id,
        username:this.username,
        password:this.password,
        email:this.email
    },
    process.env.generateaccesstokenm,{
        
    }
)
}

Userschema.methods.accessstoken = function () {
    return jwt.sign({
        _id:this._id,
    })
}

export const User = mongoose.model("User",Userschema)