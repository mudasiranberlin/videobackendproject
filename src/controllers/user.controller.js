// Import asyncHandler to handle errors automatically in async functions
import { asyncHandler } from "../utils/asyncHandler.js"

// Import custom error class to create our own errors
import { ApiError } from "../utils/ApiError.js"

// Import User model to interact with MongoDB User collection
import { User } from "../models/user.models.js"

// Import Cloudinary function to upload images
import { uploadCloudinary } from "../utils/cloudinary.js"

// Import custom API response format
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";



// pratice again 



// pratice again 


const generateAccessAndRefereshTokens = async (userId)=>{
    try {
        const user = await User.findById(userId) 
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken=refreshToken
        await user.save({validateBeforeSave :false})

        return {accessToken,refreshToken}
        
    } catch (error) {
        throw new ApiError(500,"Something went wrong while generate refresh and access token")
        
    }

//     } catch (error) {
//     console.log("REAL TOKEN ERROR:", error);

//     throw new ApiError(
//         500,
//         error?.message || "Something went wrong while generating tokens"
//     );
// }

}


// Register User function
// asyncHandler will catch any error automatically
const registerUser = asyncHandler(async (req, res) => {

    // Getting user information from frontend request body
    // Example:
    // req.body = {
    // fullname:"Mudasir",
    // username:"mudasir123",
    // email:"test@gmail.com",
    // password:"12345"
    // }

    const { fullname, username, email, password } = req.body

console.log("req.files:", req.files);
console.log("req.body:", req.body);



    // Checking if any required field is empty
    // .some() checks if at least one value is empty
    // .trim() removes extra spaces

    if ([fullname, email, username, password].some(
            (field) => field?.trim() === "")) {

        // Stop execution and send error message
        throw new ApiError(
            400,
            "All fields are required"
        )
    }



    // Checking if user already exists in database
    // Search by email OR username

    const existedUser = await User.findOne({
        $or: [
            { username },
            { email }
        ]
    })



    // If user already exists
    // Do not create duplicate account

    if (existedUser) {

        throw new ApiError(
            409,
            "User with email or username already existed"
        )
    }



    // Getting avatar image path from uploaded files

    // Example:
    // req.files.avatar[0].path
    // = "/uploads/profile.png"

    const avatarlocalpath =
        req.files?.avatar[0]?.path;



    // Getting cover image path

    // const coverimagelocalpath =
    //     req.files?.coverImage[0]?.path

        let coverimagelocalpath;

        if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage >0) {
            coverimagelocalpath = req.files.coverImage[0].path
            
        }




    // Avatar image is required
    // If user did not upload profile picture

    if (!avatarlocalpath) {

        throw new ApiError(
            400,
            "Avatar file is required where is the Error"
        )
    }


console.log("req.files:", req.files);

    // Upload avatar image to Cloudinary
    // Local computer image
    //       |
    //       ↓
    // Cloudinary storage
    //       |
    //       ↓
    // Returns image URL

    const avatar =
        await uploadCloudinary(avatarlocalpath)



    // Upload cover image to Cloudinary

    const coverImage =
        await uploadCloudinary(coverimagelocalpath)




    // If avatar upload failed

    if (!avatar) {

        throw new ApiError(
            400,
            "Avatar file is required"
        )
    }




    // Create new user in MongoDB database

    const user = await User.create({

        // User full name
        fullname,


        // Save Cloudinary avatar URL
        avatar: avatar.url,


        // Save cover image URL
        // If no cover image exists, save empty string

        coverImage: coverImage?.url || "",


        // User email
        email,


        // User password
        password,


        // Convert username into lowercase
        // Example:
        // MUDASIR123 → mudasir123

        username: username.toLowerCase()

    })




    // Find the created user from database
    // Remove password and refresh token
    // because we should never send them to frontend

    const createdUser =
        await User.findById(user._id)
        .select("-password -refreshToken")




    // If user was not created successfully

    if (!createdUser) {

        throw new ApiError(
            500,
            "Something went wrong while registering the user"
        )

    }




    // Send success response back to frontend

    return res.status(201).json(

        new ApiResponse(

            200,

            createdUser,

            "User registered successfully"

        )

    )


})

///.    practice 

const loginUser = asyncHandler( async (req,res)=>{
    // req body ->data
    //check the username or password 
    // find the user
    // check password
    // access and refresh token 
    // send cookies 
    // response 

    const {email,username,password}=req.body
    if (!username && !email) {
        throw new ApiError(400,"Username or email is required")
    }

    const user= await User.findOne({
        $or:[{username},{email}]
    })

    if (!user) {
        throw new ApiError(404,"Usernot existed");
    }


    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401,"Invalid user credentials") 
    }

   const {accessToken,refreshToken} = await generateAccessAndRefereshTokens(user._id)
   const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

   const options = {
    httpOnly : true,
    secure: true
   }

   return res.status(200)
   .cookie("accessToken",accessToken,options)
   .cookie("refreshToken",refreshToken,options)
   .json(
    new ApiResponse(
        200,
        {
            user:loggedInUser,accessToken,refreshToken
        },
        "User logged in sucessfully"

    )
   )



    
})

const logoutUser = asyncHandler(async (req,res) => {
    await User.findByIdAndUpdate(
        req.user._id,{
            $set:{
                refreshToken:undefined
            }
        },
        {
            new:true
        }
    )
    const options = {
    httpOnly : true,
    secure: true
   }
   return res
   .status(200)
   .clearCookie("accessToken",options)
   .clearCookie("refreshToken",options)
   .json(new ApiResponse(200,{},"User Logged Out"))
})



// Export this function
// So we can use it in routes
// 

const refreshAccessToken = asyncHandler( async(req,res)=>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if (!incomingRefreshToken) {
        throw new ApiError(201,"Unauthirized request")

        
    }
    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
        const user = User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401,"Invalid refresh token")
        }
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401,"refresh token expired or used ")
            
        }
        const options={
            httpOnly: true,
            secure:true
        }
        const {accessToken,newrefreshToken} =  await generateAccessAndRefereshTokens(user._id)
        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",newrefreshToken,options)
        .json(
            new ApiResponse(200,{accessToken,refreshToken:newrefreshToken},"Access token refreshed ")
        )
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid refresh token")
        
    }

} )

const refreshAccessToken = asyncHandler( async (req,res)=>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if (!incomingRefreshToken) {
        throw new ApiError(401,"Un Authorized Request ")     
    }
    const decodedToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
    )
    const user = User.findById(decodedToken?._id)
    if (!user) {
        throw new ApiError(401,"Invalid Refresh Token Request ")     
    }
    if (incomingRefreshToken !== user?.refreshToken) {
        throw new ApiError(401,"Invalid Refresh Token Request ")  
    }
    const options={
        httpOnly:true,
        secure:true
    }
    generateAccessAndRefereshTokens(user._id)
    return res
    .status(200)
    .cookies
})

export  {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken
}