import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})




connectDB()
.then(()=>{
    app.listen()
})
.catch((err)=>{
    console.log("NongoDB Connection failed !!!", err);
    
})