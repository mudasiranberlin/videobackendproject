import mongoose, { isValidObjectId } from "mongoose"
import { Video } from "../models/video.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body
    const userId = req.user._id;
    const videolocalPath = req.files?.videoFile?.[0]?.path
    const thumbnaillocalPath = req.files?.thumbnail?.[0]?.path

    if (!title?.trim()) {
        throw new ApiError(400, "title file is Missing")
    }

    if (!description.trim()) {
        throw new ApiError(400, "description file is Missing")
    }

    if (!videolocalPath) {
        throw new ApiError(400, "Video file is Missing")

    }
    if (!thumbnaillocalPath) {
        throw new ApiError(400, "Thumbnail file is Missing")

    }
    const uploadvideo = await uploadCloudinary(videolocalPath)
    const uploadthumbnail = await uploadCloudinary(thumbnaillocalPath)

    if (!uploadvideo?.url) {
        throw new ApiError(400, "Error While uploading on Video")

    }
    if (!uploadthumbnail?.url) {
        throw new ApiError(400, "Error While uploading on Video")

    }

    const video = await Video.create({
        videoFile: uploadvideo.url,
        thumbnail: uploadthumbnail.url,
        title: title.trim(),
        description: description.trim(),
        duration: uploadvideo.duration || 0,
        views: 0,
        isPublished: true,
        owner: userId
    })

    return res.status(201).json(
        new ApiResponse(
            201,
            video,
            "Video uploaded successfully"
        )
    );
    // TODO: get video, upload to cloudinary, create video
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    
    //TODO: delete video
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}