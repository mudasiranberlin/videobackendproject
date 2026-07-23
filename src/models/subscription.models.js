import mongoose from "mongoose";

const SubscriptionScheme = new mongoose.Schema({

    subscriber:{
        type:String,
        
    }

},{timestamps:true})

export const Subscription = mongoose.model("Subscription",SubscriptionScheme)