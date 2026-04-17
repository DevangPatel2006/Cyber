const errorHandler = (err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error:`, err.message || err);

  let status = 500;
  
  if (err.message) {
    if (err.message.includes("API key")) {
      status = 401;
    } else if (err.message.includes("rate limit")) {
      status = 429;
    } else if (err.message.includes("quota")) {
      status = 402;
    }
  }

  res.status(status).json({
    success: false,
    error: err.message || "Internal server error"
  });
};

module.exports = errorHandler;
