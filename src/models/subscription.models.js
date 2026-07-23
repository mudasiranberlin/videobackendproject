import mongoose from "mongoose";

const SubscriptionScheme = new mongoose.Schema({

    subscriber:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }

},{timestamps:true})

export const Subscription = mongoose.model("Subscription",SubscriptionScheme)