import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    productid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    quntatity :{
        type:Number,
        required:true
    },

    status:{
        type:String,
        enum:["Pending","Cancelled",""]
    }
})

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
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }

},{timestamps:true})

export const User = mongoose.model("User",UserSchema)