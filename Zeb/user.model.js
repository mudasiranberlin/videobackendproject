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
            content: mongoose.Schema.Types.ObjectId,
            ref:"user"

        }
    ],
    stock:{
        default:0,
        type:String
    },
    category:{
        default: 0,
        ty
    }

},{timestamps:true})

export const User = mongoose.model("User",UserSchema)