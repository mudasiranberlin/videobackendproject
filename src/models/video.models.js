import mongoose,{Schema} from "mongoose";

const VideoSchema = new Schema({
    videoFile:{

    },
    thumnail:{}
},{timestamps:true})

export const Video = mongoose.model("Video",VideoSchema)