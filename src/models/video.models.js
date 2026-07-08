import mongoose,{Schema} from "mongoose";

const VideoSchema = new Schema({
    videoFile:{

    },
    thumnail:{

    },
    owner:{

    },
    title:{

    },
    
},{timestamps:true})

export const Video = mongoose.model("Video",VideoSchema)