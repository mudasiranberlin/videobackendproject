import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"})) 

// submits a form written in JSON.express.json() works like a translator.
// {
 "name":"Ram",
 "age":10
}
and turns it into:  req.body 
so you can do

console.log(req.body.name)

app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.use(express.static("public"))

app.use(cookieParser())

export default app