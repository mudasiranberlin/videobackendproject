import mongoose from "mongoose";

const SubscriptionScheme = new mongoose.Schema({

    subscriber:{
        type: mongoose.Types.ObjectId
    }

},{timestamps:true})

export const Subscription = mongoose.model("Subscription",SubscriptionScheme)