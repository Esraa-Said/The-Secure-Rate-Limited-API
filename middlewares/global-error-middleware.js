const httpStatusText = require("../utils/http-status-text");

const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    status: httpStatusText.ERROR,
    message,
  });
};

module.exports = globalErrorHandler;
