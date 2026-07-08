import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONG}`)
        
    } catch (error) {
        console.log("Failed to connect the database :",error);
        
    }
    
}