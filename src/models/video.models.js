import mongoose,{Schema} from "mongoose";

const VideoSchema = new Schema({
    videoFile:{

    },
    thum
},{timestamps:true})

export const Video = mongoose.model("Video",VideoSchema)