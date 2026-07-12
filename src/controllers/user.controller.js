import { asyncHandler } from "../utils/asyncHandler.js"

const registerUser = asyncHandler( async (req,res)=>{
    // res.status(200).json({
    //     message:"ok mudasir "
    // })
    const {fullname,username,email} = req.body
    console.log();
    
} )

export default registerUser