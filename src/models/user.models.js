import mongoose, {Schema} from "mongoose";
const Userschema = new Schema({},{timestamps:true})

username:{
    type:String,
    
}

export const User = mongoose.model("User",Userschema) 