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
    views:{

    },
    isPublished:{
        type

    },
},{timestamps:true})

export const Video = mongoose.model("Video",VideoSchema)