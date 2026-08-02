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
import { Subscription } from "../models/subscription.models.js"



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
        const user = await User.findById(decodedToken?._id)
    
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
        const {accessToken,refreshToken} =  await generateAccessAndRefereshTokens(user._id)
        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json(
            new ApiResponse(200,{accessToken,refreshToken:refreshToken},"Access token refreshed ")
        )
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid refresh token")
        
    }

} )


const changeCurrentPassword = asyncHandler(async (req,res)=>{
    const {oldPassword,newPassword} = req.body
    const user =  await User.findById(req.user?._id)
    const isPasswordCorrect= await user.isPasswordCorrect(oldPassword)
    if (!isPasswordCorrect) {
        throw new ApiError(401,"Please enter correct Password")
    }
    user.password = newPassword
    await user.save({validateBeforeSave:false})

    return res.status(200).json(new ApiResponse(200,{},"password changed sucessfully"))
})


const getCurrentUser = asyncHandler(
    async (req, res) => {

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    req.user,
                    "Current user fetched successfully"
                )
            )
    }
)

const updateAccountDetails = asyncHandler( async(req,res)=>{

    const {fullname, email} =req.body

    if (! fullname|| !email) {

        throw new ApiError(400,"All fields are required")
        
    }
    await User.findByIdAndUpdate(
        req.user?._id,
    {
        $set:{
            fullname:fullname,
            email:email
        }

    },
    {new:true}
).select("-password")

return res.status(200)
.json(new ApiResponse(200, user,"Account details Updated sucessfully"))

} )


const updateUserAvatar = asyncHandler( async (req,res)=>{

    const avatarLocalPath = req.file?.path
    if (avatarLocalPath) {
        throw new ApiError(400,"Avatar file is Missing")
        
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if (!avatar.url) {
        throw new ApiError(400,"Error While uploading on avatar")
        
    }

    const user =  await User.findByIdAndUpdate(req.user?._id,
        {
            $set:
            { avatar:avatar.url}
        },
        {new : true}
    ).select("-password")
    return res.status(200)
    .json(
        new ApiError(200,user,"Avatar Image has been updated sucessfully")
    )
} ) 

const updateUserCoverImage = asyncHandler( async (req,res)=>{

    const CoverImageLocalPath = req.file?.path
    if (!CoverImageLocalPath) {
        throw new ApiError(400,"Cover Image path file is Missing")
        
    }
    const CoverImage = await uploadOnCloudinary(CoverImageLocalPath)

    if (!CoverImage.url) {
        throw new ApiError(400,"Error While uploading on avatar")
        
    }

    const user =  await User.findByIdAndUpdate(req.user?._id,
        {
            $set:
            { CoverImage:CoverImage.url}
        },
        {new : true}
    ).select("-password")

    return res.status(200)
    .json(
        new ApiError(200,user,"CoverImage has been updated sucessfully")
    )
} ) 


//   start aggeration pipeline

const getUserChannelProfile = asyncHandler(async (req,res)=>{
    const {username} = req.params

    if (!username?.trim()) {
        throw new ApiError(400,"Username is Missing")
    }

    const channel = await User.aggregate([
        {
            $match:{
                username:username?.toLowerCase()
            }
        },
        {
            $lookup:{
                from:"subscriptions",
                localField:"_id",
                foreignField:"channel",
                as:"subscribers"
            }
        },
        {
            $lookup:{
                from:"subscriptions",
                localField:"_id",
                foreignField:"subscriber",
                as:"subscribedTo"

            }

        },
        {
            $addFields:{
                subscribersCount:{
                    $size: "$subscribers"
                },
                channelSubscribedToCount:{
                    $size:"$subscribedTo" 
                },

                isSubscribed:{
                    $cond:{
                        if:{$in:[req.user?._id,"$subscribers,subscriber"]},
                        then:true,
                        else:false
                    }
                }

            }
        },
        {
            $project:{
            fullname:1,
            username:1,
            subscribersCount:1,
            isSubscribed:1,
            avatar:1,
            coverImage:1,
            email:1

        }
        }
    ])

    if (!channel?.length) {
        throw new ApiError(401,"channel doest not exist")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,channel[0],"User channel fetched sucessfully"
        )
    )
})

// Valid aggeration   end 


const getWatchHistory = asyncHandler( async()=>{
    const user = await User.aggregate([
        {
            $match:{
                _id:new mongoose.Types.ObjectId(req.user._id)
            },
            $lookup:{
                from: "videos",
                localField:"owner",
                foreignField:"_id",
                as:"watchHistory",
                pipeline:[
                    {
                        $lookup:{
                            from:"users",
                            localField:"owner",
                            foreignField:"_id",
                            as:"owner",

                            pipeline:[
                                {
                                    $project:{
                                        fullname:1,
                                        username:1,
                                        avatar:1

                                    }
                                },
                                {
                                    $addFields:{
                                        owner:{
                                            $first:"$owner"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                ]

            }}
        }
    ])
    return res.status(200)
    .json(
        new ApiResponse(200,user[0].WatchHistory,"Watch history fetched successfuly")

    )
})



const getWatchHistory = asyncHandler(async (req, res) => {
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [
                                {
                                    $project: {
                                        fullname: 1,
                                        username: 1,
                                        avatar: 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields: {
                            owner: {
                                $first: "$owner"
                            }
                        }
                    }
                ]
            }
        }
    ]);

    return res.status(200).json(
        new ApiResponse(
            200,
            user[0].watchHistory,
            "Watch history fetched successfully"
        )
    );
});

// pratice the code 


// req body ->data
    //check the username or password 
    // find the user
    // check password
    // access and refresh token 
    // send cookies 
    // response 

const loginUser = asyncHandler(async(req,res)=>{
    const {username,password,email}= res.body
    if (!username && !email) {
        throw new ApiError(410,"Please enter the username and password");   
    }
    const user = await User.findOne({
        $or:[username,email]
    })

    if (!user) {
        throw new ApiError(401,"User does not exists");
    }
    const isPasswordValid= await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401,"password incoorect");
    }

    const generateAccessAndRefereshTokens = async(userId)=>{
        try {
            const user = await User.findById(userId)
            const accessToken = user.generateAccessToken()
            const refreshToken = user.generateRefreshToken()
            user.refreshToken =refreshToken
            user.save({validateBeforeSave:false})

            return {accessToken,refreshToken}
            
        } catch (error) {
            throw new ApiError(500,"Something went wrong")
        }

    }


    const {refreshToken,accessTokenawait} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser =await user.findById(user._id).select("-password-refreshToken")

    const options= {
        httpOnly:true,
        secure:true
    }
    return res.status(200)
    .cookie("refreshToken",refreshToken,options)
    .cookie("accessToken",accessToken,options)
    .json(
        new ApiResponse(200,
            {
                user:loggedInUser,accessToken,refreshToken,"User logged in SUcessfully"
            }
        )
    )

})



/// 


const incomingRefreshToken = asyncHandler(async()=>{
    req.cookies?.refreshToken ||req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401,"Unauthorized access")
        
    }
    try {
        const decodedToken= jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken._id)
        if (!user) {
            throw new ApiError(403,"Unauthorized access")
        }
    
        if (incomingRefreshToken !== user?.refreshToken ) {
            throw new ApiError(403,"refresh token expired")
        }
        const options={
            httpOnly=true,
            secure:true
        }
        const {accessToken,refreshToken} = await generateAccessAndRefereshTokens(user_id)
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,{accessToken,refreshToken},"Access token refreshed sucessfully")
    )
    } catch (error) {
        throw new ApiError(401,error?.message||"Unauthorized access")
    }

})

// Change Password API.

// Think of it like this:

// "The user wants to change their password, but first we must make sure they know their current password."
// User enters

// Old Password: 123456
// New Password: abc@123

//         │
//         ▼
// Find logged-in user
//         │
//         ▼
// Check old password
//         │
//         ▼
// Correct?
//    │           │
//   No          Yes
//    │           │
// Return Error   Save new password
//                     │
//                     ▼
// Password gets hashed
//                     │
//                     ▼
// Return Success

// const { oldPassword, newPassword } = req.body;

//get user password 

//  Step 2
//  const user = await User.findById(req.user?._id);
// Where did req.user come from?
// From your verifyJWT middleware.
// Earlier:
// Earlier:

// req.user = user;

// Suppose

// req.user = {
//     _id: "12345",
//     username: "mudasir"
// }

// Then

// req.user._id

// becomes

// 12345

// MongoDB searches:

// Database

// 12345 → Mudasir
// 67890 → Ali

// and returns

// user = {
//     _id: "12345",
//     username: "mudasir",
//     password: "$2b$10$k..."
// }

 // const isPasswordCorrect =
     // await user.isPasswordCorrect(oldPassword);
// What is isPasswordCorrect()?

// In your User model, we have this function isPasswordCorrect:

// Database

// The password is hashed, not plain text.

// Database

// password

// $2b$10$jhfdjshfjhdf...

// User enters:

// 123456

// bcrypt.compare() checks

// 123456
//         │
// Compare
//         │
// Database Hash

// If they match:

// isPasswordCorrect = true

// Otherwise:

// isPasswordCorrect = false 

// Step 5
// user.password = newPassword;

// Suppose

// Old Password

// 123456

// User wants

// abc@123

// Now

// user.password = "abc@123";

// Important: At this moment it is not yet saved in the database.

// It only changes the value in memory.


Step 6
await user.save({
    validateBeforeSave: false
});

This saves the user.

But before saving...

Your schema has something like:

// userSchema.pre("save", async function(next){

//     if(!this.isModified("password"))
//         return next();

//     this.password =
//         await bcrypt.hash(this.password, 10);

//     next();

// });
// Flow
// user.password = "abc@123"

//         │
//         ▼
// user.save()

//         │
//         ▼
// pre("save") middleware

//         │
//         ▼
// Hash password

//         │
//         ▼
// Store hashed password

// $2b$10$ksjdhfkjshdf...

// The database never stores "abc@123" directly.

// It stores only the hashed version.

// Why validateBeforeSave: false?

// Normally Mongoose validates every field before saving.

// Example:

// username is required
// email is required
// avatar is required

// But here you're only changing the password.

// So validation is skipped.

// validateBeforeSave: false

// means

// "Just save the password. Don't validate the other fields."




const changeCurrentPassword = asyncHandler( async(req,res)=>{
    const {oldPassword,newPassword} = req.body

    const user = await User.findById(req.user?._id)  // req.user = user we have the user there in auth middleware 

    const isPasswordCorrect= await user.isPasswordCorrect(oldPassword) //we have method in usermodel isPassswordCorrect

    if (!isPasswordCorrect) {
        throw new ApiError(401,"Invalid password")
    }

    user.password = newPassword  //save password.  now it will go to pre and then it will get hash userSchema.pre()
    await user.save({
        validateBeforeSave:false})
        return res
        .status(200)
        .json(new ApiResponse(200,{}, "password changed sucessfully"))
})





export  {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage
}