import mongoose from "mongoose";

connectDB = async () => {
    try {
        connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        
    } catch (error) {
        console.log("Erroe cOnnecting database",error);
        
    }
}