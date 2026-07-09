// Import multer library
// Multer helps us handle file uploads from users
import multer from "multer";

// Create storage settings for uploaded files
const storage = multer.diskStorage({
  // Decide where to save the uploaded file temporarily
  destination: function (req, file, cb) {
    // cb means callback function
    // First value = error (null means no error)
    // Second value = folder location where file will be saved
    cb(null, '/public/temp')
  },
  // Decide the name of the uploaded file
  filename: function (req, file, cb) {

    // Save file using its original name
    // Example:
    // User uploads: profile.jpg
    // Saved as: profile.jpg
    cb(null, file.originalname)
  }

})
// Create multer upload middleware
// We export it so we can use it in routes
export const upload = multer({ storage })