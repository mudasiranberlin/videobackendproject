import mongoose, {Schema} from "mongoose";
const Userschema = new Schema({},{timestamps:true})

username:{
    type:str
}

export const User = mongoose.model("User",Userschema) 