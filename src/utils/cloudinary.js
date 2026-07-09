import {v2 as cloudinary} from 'cloudinary'
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadCloudinary = async (localFilePath)=>{
    try {
        if (!localFilePath) return null
        // upload the file on cloud nary 
        const response= await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        //file has been uploaded sucessfully
        console.log("file has been uploaded in cloudnary",response.url);
        return response;
        
    } catch (error) {
        
    }
}