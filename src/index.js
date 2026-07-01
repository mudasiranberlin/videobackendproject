import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})




connectDB()
.then(()=>{
    app.on("error")
    app.listen(process.env.PORT||8080,()=>{
        console.log(`Server is Running at Port : ${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log("NongoDB Connection failed !!!", err);
    
})