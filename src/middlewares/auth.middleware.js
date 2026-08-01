import { ApiError } from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js"

 export const verfiyJWT = asyncHandler(async (req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header
        ("Authorization")?.replace("Bearer ","")
    
        if (!token) {
            throw new ApiError(401,"Cannot find the resh token")
        }
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
    
            throw new ApiError(401,"Invalid access token")
            req.user =user
            next()
        }
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid access token")
    }

 })


 // pratice 

 import { asyncHandler } from "../utils/asyncHandler.js"

# name can be anything here i give the name is verifyjwt 
here we have next also we use middle ware next andwhen it will done and then pass to another 

 export const verfiyJWT = asyncHandler( async(req,res,next
 )=>{
    req.cookies?.accessToken || req.header("Authorization")?replace("Bearer ", "")
// req.cookies we check there is cookies there or not sometime have mobile so not have cookies   so we are using ? to check accesstoken is present or not 
// if not have access token so customer can send header to get req.header

//a mobile app usually doesn't send cookies.
// Instead, it sends the token in the request header.
// Example request
// Authorization: Bearer abc123
// So we read it using
// req.header("Authorization")
// It returns
// Bearer abc123


// Why .replace("Bearer ", "")?

// JWT only needs the token.

// But the header contains

// Bearer abc123
// We remove "Bearer ".
// "Bearer abc123".replace("Bearer ", "")
// Result
// abc123
// Now we have only the JWT token.
// // 
 } )

 