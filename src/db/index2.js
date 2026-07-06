import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`The database has been connected on port ${connectionInstance.conn}`)
    } catch (error) {
        console.log("Failed to COnnect database|| !!!");
    }
}