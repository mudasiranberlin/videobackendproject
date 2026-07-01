import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})




connectDB()
.then(()=>{
    app.listen(process.env.PORT||8080,()=>{
        console.log(`Server is Running at Port : $`);
        
    })
})
.catch((err)=>{
    console.log("NongoDB Connection failed !!!", err);
    
})