// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   const token = req.headers["authorization"];
//   if (!token) {
//     return res.status(403).json({ success: false, message: "No token provided" });
//   }

//   try {
// //    const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const decoded = jwt.verify(token, "JWT_SECRET");
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ success: false, message: "Unauthorized" });
//   }
// };

// module.exports = authMiddleware;



const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  
  if (!authHeader) {
    return res.status(403).json({ success: false, message: "No token provided" });
  }

  // Ensure the header starts with "Bearer"
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ success: false, message: "Invalid token format" });
  }

  // Extract the token (remove "Bearer " prefix)
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ success: false, message: "Token missing" });
  }

  try {
    // Verify the token using the secret
    const decoded = jwt.verify(token, "JWT_SECRET");
    req.user = decoded; // Attach decoded payload to the request
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;