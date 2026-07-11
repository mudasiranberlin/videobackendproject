import mongoose from "mongoose";
import bycrpt from "bcrypt"
import jwt from "jsonwebtoken"
import mongoose from "mongoose-paginate-v2";

const Userschema = new mongoose.Schema({

    username:{
        type:String,
        lowercase:true,
        unique:true,
        required:true,
        trim:true,
        index:true
    },
    password:{
        type:String,
        required:true
    },
    fullname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        lowercase:true,
        unique:true,
        required:true,
        trim:true,
        index:true
    },







},{timestamps:true})


    Userschema.pre("save",async function (next) {
        if (!this.isModified("password")) return next()
        this.password= bycrpt.hash(this.password,10)
        next()
    })
    Userschema.methods.ispasswordcorrect = async function (password) {
        return await bycrpt.compare(password,this.password)
        
    }
    Userschema.methods.createrefreshtoken = function () {
        return jwt.sign({ 
            _id=this._id,
            username=this.username,
            email=this.email,
            fullname=this.fullname 

         },
         process.env.generaterefreshtoken,
         {
            expiresIn:process.env.exprein1day

         }

        );
        
    } 
     Userschema.methods.createrefreshtoken = function () {
        return jwt.sign({ 
            _id=this._id,
            username=this.username,
            email=this.email,
            fullname=this.fullname 

         },
         process.env.generaterefreshtoken,
         {
            expiresIn:process.env.exprein1day

         }

        );
        
    } 


export const User = mongoose.model("User",Userschema);