import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import {uploadCloudinary}

const registerUser = asyncHandler( async (req,res)=>{
    // res.status(200).json({
    //     message:"ok mudasir "
    // })
    const {fullname,username,email} = req.body
    console.log(email,fullname);
    // if (fullname=="") {
    //     throw new ApiError(400,"Full Name is required")
    // }
    if(
        [fullname,email,username,password].some((field)=>
            field?.trim() === "")
    ){
        throw new.ApiError(400,"All fields are required")
    }
    const existedUser = User.findOne({
        $or:[{email},{username}]
    })
    
    if (existedUser) {
        throw new ApiError(409,"User with email or username already existed ")
    }

   const avatarlocalpath =  req.files?.avatar[0]?.path;
   const coverimagelocalpath =req.files?.coverImage[0]?.path;

   if (!avatarlocalpath) {
    throw new ApiError(400,"Avatar file is required")
   }

    
} )

export default registerUser