const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = (allowedRoles = []) => {
    return async(req,res,next) => {
        //Request the token from headers
        const authHeaders = req.headers.authorization;
        //token validation
        if(!authHeaders || !authHeaders.startsWith("Bearer ")){
            return res.status(401).json({message: "Unauthorized: No token Provided"});
        }
        //Bearer token
        const token = authHeaders.split(" ")[1];
        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
            const user = await User.findById(decoded.id).select("-password");
            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }
            req.user = user;
            //condt for accessing API
            if(allowedRoles.length === 0){
                return next();
            }
            //Authoriation for API (for some role have access)
        if (allowedRoles.length && !allowedRoles.includes(user.role)) {
  return res.status(403).json({ message: "Forbidden: You don't have access to this API" });
}
next();
        }
catch(err) {
  console.error("Auth error:", err);
  return res.status(401).json({ message: "Invalid or expired token provided" });
        }
    }
}



module.exports = authMiddleware;