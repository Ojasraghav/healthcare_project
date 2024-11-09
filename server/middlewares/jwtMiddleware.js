 //first we are intializig jsonwebtojen modeule to use functionalities of jwt eg verify and sign in.
 
 
 const jwt= require("jsonwebtoken");

 //after succesfull register of user nad then calling the login endpoint with the already reqistered user , it willl create and return jwt token.

 const generateJwtToken=(userData)=>{
    return jwt.sign(userData,process.env.PRIVATE_KEY);
 }
 //after login weare gettomh the token and for validating the jwt token that is is correct or not we will proceed with sceure routues to GET/POST /UPDATE/DELETE.
 const validateJwttoken=(req,res,next)=>{
    //we are chcekicg that token is available or not in request headers.
    const autocheck=req.headers.authorization;
    //option 1:req header token ,authorization not sent(doesn't exsist).
    if(!tokencheck) return res.status(401).json({err:'TOKEN NOT AVAILABLE'});
    //OPTION 2 req header getting token but not in a right format:
    //authorization basic/bearer
    //basic btaao username:password->basic dffnadsklhfiasf
    //bearer 
    const token= req.headers.authorization.split(' ')[i];
    if (!token){
        return res.status(401).json;
        ({err:'Invalid token'});
    }
    try{

    req.user=validateToken=jwt.verify(token);
    process.env.PRIVATE_KEY;
    req.user=validateJwttoken;
    next();
    }
    catch(err){
        return res.status(401).json(err.message);
    }
}

    module.exports={generateJwtToken,validateJwtToken}
  
    


 