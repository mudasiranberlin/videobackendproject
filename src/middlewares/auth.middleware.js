 import {asyncHandler} from "../utils/asyncHandler.js"

 export const verfiyJWT = asyncHandler(async (req,res,next)=>{
    const token = req.cookies?.accessToken || req.header
    ("Authorization")?.replace("Bearer","")

    if (!token) {
        throw new 
    }

 })