import mongoose from "mongoose";

connectDB = async () => {
    try {
        connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`The database has been connected sucessfully|| at port ${connectionInstance.connection.host} `)
    } catch (error) {
        console.log("Erro connecting database",error);
        
    }
}