import mongoose from "mongoose";


( async (params) => {
    try {
        mongoose.connect(`${process.env.M}`)
        
    } catch (error) {
        console.error("ERROR",error)
        
    }
})()