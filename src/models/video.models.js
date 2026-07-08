import mongoose,{Schema} from "mongoose";

const VideoSchema = new Schema({
    videoFile:{

    },
    thumnail:{

    },
    owner:{

    },
    
},{timestamps:true})

export const Video = mongoose.model("Video",VideoSchema)