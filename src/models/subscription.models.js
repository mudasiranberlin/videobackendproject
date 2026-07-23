import mongoose from "mongoose";

const SubscriptionScheme = new mongoose.Schema({

},{timestamps:true})

export const Subscription = mongoose.model("Subscription")