import mongoose,{Schema} from "mongoose";

const VideoSchema = new Schema({
    vide
},{timestamps:true})

export const Video = mongoose.model("Video",VideoSchema)