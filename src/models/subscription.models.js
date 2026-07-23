import mongoose from "mongoose";

const SubscriptionScheme = new mongoose.Schema({

    subscriber:{
        type: mongoose.ty
    }

},{timestamps:true})

export const Subscription = mongoose.model("Subscription",SubscriptionScheme)