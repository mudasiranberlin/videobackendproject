import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

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
        [fullname,email,username,password].some((field)=>field?.tr)
    ) {
        
    }

    
} )
export {registerUser}