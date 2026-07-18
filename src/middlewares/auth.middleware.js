 import {asyncHandler} from "../utils/asyncHandler.js"

 export const verfiyJWT = asyncHandler(async (req,res,next)=>{
    req.cookies?.accessToken || req.header
    ("Authorization")?.replace("B")

 })