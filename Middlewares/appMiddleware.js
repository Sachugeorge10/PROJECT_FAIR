const appMiddleware=(req,res,next)=>{
    console.log("inside the middleware");
    next()
}

module.exports=appMiddleware