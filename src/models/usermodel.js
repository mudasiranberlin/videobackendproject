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
    if (this.isModified) {
        
    }
     this.password= await bcrypt.hash(this.password, 10) 
});

export const User = mongoose.model("User",Userschema)