import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    username:{
        type: String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    content:[
        {
            content: mongoose.Schema.TypesObjectId

        }
    ]

},{timestamps:true})

export const User = mongoose.model("User",UserSchema)