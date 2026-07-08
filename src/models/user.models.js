import mongoose from "mongoose";
const Userschema = new mongoose.Schema({},{timeseries})

export const User = mongoose.model("User",Userschema) 