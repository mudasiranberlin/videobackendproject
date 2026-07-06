import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        
    } catch (error) {
        console.log("Failed to COnnect database|| !!!");
    }
}