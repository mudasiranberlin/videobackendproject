import mongoose from "mongoose";


( async (params) => {
    try {
        mongoose.connect(`${process.env}`)
        
    } catch (error) {
        console.error("ERROR",error)
        
    }
})()