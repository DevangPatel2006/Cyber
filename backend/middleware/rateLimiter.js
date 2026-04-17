const rateLimit = require('express-rate-limit');

const classifyLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // Limit each IP to 30 requests per `window` (here, per minute)
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      success: false,
      error: "Too many requests. Please wait a minute."
    });
  }
});

module.exports = {
  classifyLimiter
};
