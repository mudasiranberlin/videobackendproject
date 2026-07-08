import mongoose,{Schema} from "mongoose";

const VideoSchema = new Schema({
    videoFile:{
        
    }
},{timestamps:true})

export const Video = mongoose.model("Video",VideoSchema)