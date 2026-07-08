import mongoose, {Schema} from "mongoose";
const Userschema = new Schema({
    username:{
        
    }






},{timestamps:true})
export const User = mongoose.model("User",Userschema) 