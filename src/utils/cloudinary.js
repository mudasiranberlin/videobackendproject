import {v2 as cloudinary} from 'cloudinary'
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME
    api_key: "your_api_key",
    api_secret: "your_api_secret"
});