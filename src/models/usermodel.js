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

Userschema.pre("save", async function (next) {

    // If password was NOT changed, skip hashing
    if (!this.isModified("password")) return next();

    // Convert password into a secure hash
    this.password = await bcrypt.hash(this.password, 10);

    // Continue saving
    next();
});



UserSchema.pre('save', async function(next) {
    if (!this.isModified("password"))return next()
    this.password = await bcrypt.hash(this.password,10) 
next()

});



export const User = mongoose.model("User",UserSchema)