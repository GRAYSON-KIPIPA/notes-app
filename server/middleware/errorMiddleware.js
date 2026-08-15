const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  if (err.code === "23505") {
    return res.status(409).json({
      message: "Resource already exists",
    });
  }

  if (err.code === "23503") {
    if (err.constraint === "notes_category_id_fkey") {
      return res.status(409).json({
        message: "Cannot delete category because it is being used by notes",
      });
    }
    return res.status(400).json({
      message: "Referenced resource does not exist",
    });
  }

  if (err.statusCode) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  res.status(500).json({
    message: "Server error",
  });
};

module.exports = errorMiddleware;
