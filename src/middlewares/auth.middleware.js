 import {asyncHandler} from "../utils/asyncHandler.js"

 export const verfiyJWT = asyncHandler(async (req,res,next)=>{
    const tokenreq.cookies?.accessToken || req.header
    ("Authorization")?.replace("Bearer","")

 })