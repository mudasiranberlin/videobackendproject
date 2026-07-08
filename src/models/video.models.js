import mongoose,{Schema} from "mongoose";

const VideoSchema = new Schema({
    videoFile:{
        type:String,
        required:true
    },
    thumnail:{
        type:String,
        required:true

    },
    owner:{
        type:String,
        required:true

    },
    title:{
        type:String,
        required:true

    },
    description:{
        type:String,
        required:true

    },
    duration:{
        type:Number,
        required:true
    },
    views:{
        type:Number,
        required:true

    },
    isPublished:{
        type:Boolean,


    },
},{timestamps:true})

export const Video = mongoose.model("Video",VideoSchema)