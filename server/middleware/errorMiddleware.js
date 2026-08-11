const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  if (err.code === "23505") {
    return res.status(409).json({
      message: "Resource already exists",
    });
  }

  if (err.code === "23503") {
    return res.status(400).json({
      message: "Referenced resource does not exist",
    });
  }

  res.status(500).json({
    message: "Server error",
  });
};

module.exports = errorMiddleware;
