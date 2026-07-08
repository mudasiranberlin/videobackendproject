import mongoose,{Schema} from "mongoose";

const VideoSchema = new Schema({
    videoFile:{
        type:String,
        

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
        type:Boolean,


    },
},{timestamps:true})

export const Video = mongoose.model("Video",VideoSchema)