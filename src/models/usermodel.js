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

Userschema.pre('save', async function() {
     await bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
    });
});

export const User = mongoose.model("User",Userschema)