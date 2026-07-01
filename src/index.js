import dotenv from "dotenv"            //dotenv → Reads environment variables from your .env file.
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({
    path: './env'
})  // This reads your environment file.


connectDB()  
/* A function that connects to MongoDB.
Since connecting takes time, connectDB() returns a Promise.
A Promise has two possibilities: Success ✅ or Failure ❌  
So we use:.then(...) .catch(...)

If connection is successful
.then(()=>{
This means:
"If MongoDB connects successfully, do this."
*/
.then(()=>{ 
    /*
    
    */
    app.on("error",(error)=>{     // app → our Express application also our website/server
        console.log("ERRR:",error);
        throw error.  
    })
    app.listen(process.env.PORT||8080,()=>{
        console.log(`Server is Running at Port : ${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log("NongoDB Connection failed !!!", err);
    
})