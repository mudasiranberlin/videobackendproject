// Import Cloudinary library to upload files to Cloudinary
import { v2 as cloudinary } from 'cloudinary'

// Import File System module to work with files
import fs from "fs"


// Connect our application with Cloudinary account
cloudinary.config({
    // Your Cloudinary account name
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,

    // Your Cloudinary API key
    api_key: process.env.CLOUDINARY_API_KEY,

    // Your Cloudinary secret password
    api_secret: process.env.CLOUDINARY_API_SECRET
});


// Function to upload a file to Cloudinary
// It receives the location/path of the file stored on our server
const uploadCloudinary = async (localFilePath) => {

    try {

        // If no file path is provided, stop the function
        if (!localFilePath) return null


        // Upload the file from our server to Cloudinary
        const response = await cloudinary.uploader.upload(
            localFilePath,
            {
                // Automatically detect file type
                // Example: image, video, pdf, etc.
                resource_type: "auto"
            }
        )


        // Upload completed successfully
        // response.url contains the online Cloudinary file URL
        console.log(
            "File uploaded successfully on Cloudinary:",
            response.url
        );


        // Return Cloudinary response information
        return response;


    } catch (error) {


        // If upload fails, delete the temporary file
        // because we don't need it anymore
        fs.unlinkSync(localFilePath)


        // Tell the application that upload failed
        return null

    }
}


// Export this function so we can use it in other files
export { uploadCloudinary }




import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const uploadCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        // upload the file on cloudnary 
       const response= await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        console.log("File has been upload sucessfully",response.url);
        

        
    } catch (error) {
        console.log("Error Uploading file on cloud nary ");
        
        
    }
  } 
