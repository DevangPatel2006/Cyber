const { validationResult, body } = require('express-validator');

const validateClassifyRequest = [
  body('content')
    .notEmpty().withMessage('Content cannot be empty')
    .isString().withMessage('Content must be a string')
    .isLength({ max: 5000 }).withMessage('Content exceeds maximum length of 5000 characters'),
  body('type')
    .isIn(['url', 'email', 'message', 'text']).withMessage('Type must be one of: url, email, message, text'),
    
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: errors.array()
      });
    }
    next();
  }
];

module.exports = {
  validateClassifyRequest
};
