import { asyncHandler } from "../utils/asyncHandler.js"
import {user}

const registerUser = asyncHandler( async (req,res)=>{
    // res.status(200).json({
    //     message:"ok mudasir "
    // })
    const {fullname,username} = req.body
} )

export default registerUser