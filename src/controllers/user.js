import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadCloudinary } from "../utils/cloudinary.js"

const registerUser = asyncHandler( async (req,res) => {
    // get user details from frontend
    // validation not empty 
    // check if the user is already exist or not username and email
    // check for images check avatar
    // upload from cloudnary 
    // create user object entry in db 
    // remove password and refresh token from response 
    // check the user creation 
    // return yes 


    const  {fullname,email,username,password} =req.body
    console.log("email",email);

    if (fullname === "") {
        throw new ApiError(400,"Full name is required")
    }

    if (
        [fullname,email,username,password].some((field)=>field?.trim() ==="" )
    ) {

        throw new ApiError(400,"All fields are required ")
    }

    const existedUser= User.findOne({
        $or:[{username},{email}]
    })

    if (existedUser) {
        throw new ApiError(400,"Username  email already created ")
    }

    const avatarlocalpath = req.files?.avatar[0]?.path;
    const coverimagelocalpath = req.files?.avatar[0]?.path;

    if (!avatarlocalpath) {
        throw new ApiError(409,"Everthing is Error ")
    }

    const avatar= await uploadCloudinary(avatarlocalpath) 
    const coverImage= await uploadCloudinary(coverimagelocalpath)

    if (!avatar) {
        throw new ApiError(400,"Error")
        
    }

    const user = await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })

    const createdUser = await User.findByid(user._id).select("-passwors -refreshtoken")

    if


    
} )
export {registerUser}