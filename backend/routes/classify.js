const express = require('express');
const router = express.Router();
const { classifyContent } = require('../controllers/classifyController');
const { validateClassifyRequest } = require('../middleware/validateRequest');
const { classifyLimiter } = require('../middleware/rateLimiter');

router.post('/classify', classifyLimiter, validateClassifyRequest, classifyContent);

module.exports = router;
