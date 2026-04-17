const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
  const isGroqConfigured = !!process.env.GROQ_API_KEY;
  
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    groq: isGroqConfigured ? "connected" : "not configured"
  });
});

module.exports = router;
