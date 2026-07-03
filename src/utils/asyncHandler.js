const asyncHandler = (requestHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requestHandler(res,req))
    }
}








const asyncHandler = (fn)=>{
async (req,res,next) => {
    try {
        await fn(req,res,next)
    } 
    catch (error) {
        res.status(error.code || 5000).json({
            success:false,
            message:error.message
        })
        
    }
}
}