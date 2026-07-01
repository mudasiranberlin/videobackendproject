import dotenv from "dotenv"
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({
    path: './env'
})




connectDB()
.then(()=>{
    app.listen(process.env)
})
.catch()

connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("ERRR:",error);
        throw error
    })
    app.listen(process.env.PORT||8080,()=>{
        console.log(`Server is Running at Port : ${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log("NongoDB Connection failed !!!", err);
    
})