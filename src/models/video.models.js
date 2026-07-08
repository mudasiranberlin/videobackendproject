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
        type: Schema.Types.ObjectId,
        
    },
    title:{
        type:String,
        required:true

    },
    description:{
        type:String,
        required:true

    },
    duration:{
        type:Number,
        required:true
    },
    views:{
        type:Number,
        default:0,

    },
    isPublished:{
        type:Boolean,
        default:true


    },
},{timestamps:true})

export const Video = mongoose.model("Video",VideoSchema)