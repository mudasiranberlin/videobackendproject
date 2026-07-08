import mongoose, {Schema} from "mongoose";
const Userschema = new Schema({
    username:{
        type:String,
        lowercase:true,
        trim:true,
        index
    }






},{timestamps:true})
export const User = mongoose.model("User",Userschema) 