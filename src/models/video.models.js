import mongoose,{Schema} from "mongoose";

const VideoSchema = new Schema({
    videoFile:{
        type:String,
        required:true
    },
    thumnail:{
        type:String,
        required:true

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