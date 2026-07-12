import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { use } from "react";

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
        [fullname,email,use]
    )
    
} )

export default registerUser