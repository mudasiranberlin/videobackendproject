import mongoose from "mongoose";
import { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const UserSchema = new Schema({
    username:{
        type: String,
        required :true,
        trim : true,
        unique:true,
        required:true,
        index:true
    },
    email:{
        type: String,
        required :true,
        trim : true,
        unique:true,
        required:true,
        index:true
    },
    password:{
        type: String,
        required :true,
    }



},{timestamps:true})


UserSchema.schema.pre('save', function() {
    if (this.isModified ="password") return next()
     this.password = await  bcrypt.hash(this.password,10)
    next()
});

UserSchema.methods.ispasswordcorrect = async function (password) {
    await bcrypt.compare(password,this.password)
}
UserSchema.methods.createrefreshtoken = async function () {
   jwt.sign({
     _id : this._id,
     fullname : this.fullname,
     password : this.password,
     
    }, 
    privateKey, 
    
)}
export const User = mongoose.model("User",UserSchema)