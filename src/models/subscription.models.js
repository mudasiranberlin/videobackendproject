import mongoose from "mongoose";

const SubscriptionScheme = new mongoose.Schema({

    subscriber:{
        type: str
    }

},{timestamps:true})

export const Subscription = mongoose.model("Subscription",SubscriptionScheme)