import { ApiError } from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"

 export const verfiyJWT = asyncHandler(async (req,res,next)=>{
    const token = req.cookies?.accessToken || req.header
    ("Authorization")?.replace("Bearer","")

    if (!token) {
        throw new ApiError(401,"Cannot find the resh token")
    }

 })


 import { ApiError } from "../utils/ApiError.js"
 import { asyncHandler } from "../utils/asyncHandler.js"

 export const verfiyJWT = asyncHandler( async(req,res,next)=>{
    const token = req.cookies?.accessToken || req.header
    ("Authorization")?.replace("")

 } )