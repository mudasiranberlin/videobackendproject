import mongoose,{Schema} from "mongoose";

const VideoSchema = new Schema({
    videoile
},{timestamps:true})

export const Video = mongoose.model("Video",VideoSchema)