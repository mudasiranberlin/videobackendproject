import mongoose from "mongoose";

connectDB = async () => {
    try {
        connectionInstance = await mongoose.connect('mongodb://127.0.0.1:27017/test');
        
    } catch (error) {
        console.log("Erroe cOnnecting database",error);
        
    }
}