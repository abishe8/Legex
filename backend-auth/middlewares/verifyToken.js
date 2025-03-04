import jwt from "jsonwebtoken"


export const verifyToken = (req, res, next) => {

   const token = req.cookies.token

   if(!token){
      return res.status(401).json({success:false, message:"Unauthorized - no token provided"})
   }

   try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)

      if(!decodedToken) return res.status(401).json({success:false, message:"Unauthorized - invalid token"})

      req.userId = decodedToken.userId

      next()

   } catch (error) {
      console.log("Error in verify token:", error);
      return res.status(500).json({ success:false, message: "Server error"})
   }
} 