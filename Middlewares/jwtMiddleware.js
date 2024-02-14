
const jwt=require('jsonwebtoken')

const jwtMiddleware=(req,res,next)=>{
    console.log("inside the jwtmiddleware");
    //get the token form user request
    const token=req.headers['authorization'].slice(7)
    console.log(token);
    try{

        //token verfication

        const tokenVarification = jwt.verify(token,'superkey2024')
        console.log(tokenVarification);
        req.payload=tokenVarification.userId
        next()

    }
    catch(err)
    {
        res.status(401).json("Authorization failed... please login again .....")
    }
}

module.exports=jwtMiddleware