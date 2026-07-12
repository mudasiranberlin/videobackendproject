import { asyncHandler } from "../utils/asyncHandler.js"

const registerUser = asyncHandler( async (req,res)=>{
    // res.status(200).json({
    //     message:"ok mudasir "
    // })
    const {fullname} = req.body
} )

export default registerUser