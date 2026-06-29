import mongoose from "mongoose";


( async (params) => {
    try {
        mongoose.connect(process)
        
    } catch (error) {
        console.error("ERROR",error)
        
    }
})()