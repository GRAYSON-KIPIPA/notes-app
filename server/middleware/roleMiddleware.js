const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    if (req.user.role !== requiredRole) {
      return res.status(403).json({
        message: "You are not authorized to perform this action",
      });
    }
    next();
  };
};

module.exports = roleMiddleware;
