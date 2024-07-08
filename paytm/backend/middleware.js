const {JWT_SECRET}=require("./config");
const jwt=require("jsonwebtoken");

const authMiddleware= (req,res,next)=>{
    const auth=req.headers.authorization;
    if(!auth || !auth.startsWith('Bearer ')){
        return res.status(411).json({msg:"here"})
    }

    const token=auth.split(" ")[1]


    try{
        const decoded= jwt.verify(token,JWT_SECRET);
    
        req.userId=decoded.userId;
  
        next();
    }
    catch(err){
        return res.status(403).json({message:"inside second"})
    }

}

module.exports=authMiddleware;