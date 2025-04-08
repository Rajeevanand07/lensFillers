import jwt from "jsonwebtoken";


export const isAuthenticated = (req, res, next) => {
  const token = req.cookies?.token;

  console.log(token)

  if (!token) {
    return res.status(401).json({ success:false,message: "Unauthorized: No token provided" });

  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);    
    req.user = decoded; // Add decoded user data to the request object
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};
