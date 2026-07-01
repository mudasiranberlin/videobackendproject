import dotenv from "dotenv"            //dotenv → Reads environment variables from your .env file.
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({
    path: './env'
})


connectDB()  //A function that connects to MongoDB.
.then(()=>{
    app.on("error",(error)=>{     // app → our Express application.
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