import mongoose,{Schema} from "mongoose";

const VideoSchema = new Schema({
    video
},{timestamps:true})

export const Video = mongoose.model("Video",VideoSchema)