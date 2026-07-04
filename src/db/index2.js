import mongoose from "mongoose";

connectDB = async () => {
    try {
        connectionInstance = await mongoose.connect()
        
    } catch (error) {
        console.log("Erroe cOnnecting database",error);
        
    }
}