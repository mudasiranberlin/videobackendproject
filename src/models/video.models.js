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
    description:{

    },
    duration:{

    },
    
},{timestamps:true})

export const Video = mongoose.model("Video",VideoSchema)