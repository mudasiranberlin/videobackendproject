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
    req.cookies?.accessToken || req.header
// req.cookies we check there is cookies there or not sometime have mobile so not have cookies   so we are using ?
 } )

 