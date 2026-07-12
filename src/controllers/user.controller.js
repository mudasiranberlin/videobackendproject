import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiE}

const registerUser = asyncHandler( async (req,res)=>{
    // res.status(200).json({
    //     message:"ok mudasir "
    // })
    const {fullname,username,email} = req.body
    console.log(email,fullname);
    if (fullname=="") {
        throw new Api
    }
    
} )

export default registerUser