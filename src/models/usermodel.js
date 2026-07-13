import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema({
    username:{
        t
    }

},{timestamps:true})

export const User = mongoose.model("User",UserSchema)