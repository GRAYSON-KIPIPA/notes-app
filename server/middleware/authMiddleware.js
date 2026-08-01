const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    console.log("Auth middleware is running");
    const authHeader = req.headers.authorization;

    console.log("AuthHeader: ", authHeader);

    //Check if header exists
    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization header is missing",
      });
    }

    //Check if it starts with "Bearer"
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Invalid authorization format",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: "Authorization header is missing",
    });
  }
};

module.exports = authMiddleware;
