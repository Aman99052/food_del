import jwt from "jsonwebtoken"

const authMiddleware =async (req,res,next)=>{
    const {token}=req.headers;
   
    if(!token){
        return res.json({success:false,message:"Not Authorized Login Again"})
    }
    try{
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId=token_decode.id;  //take the token and convert into the userid using that userid we can and remove data
        next();
        }catch(error){
         //console.log(error);
         res.json({success:false,message:error.message});
    }

}

export default authMiddleware;