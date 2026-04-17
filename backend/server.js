require('dotenv').config();
const express = require('express');
const cors = require('cors');

const classifyRouter = require('./routes/classify');
const healthRouter = require('./routes/health');
const errorHandler = require('./middleware/errorHandler');

const app = express();

const PORT = process.env.PORT || 3001;

// CORS configuration
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

// Body parsing middleware
app.use(express.json({ limit: "10kb" }));

// Mount routes
app.use('/api', classifyRouter);
app.use('/api', healthRouter);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found"
  });
});

// Global error handler must be mounted LAST
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🛡️ CyberGuard Backend running on port ${PORT}`);
  
  if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'your_groq_api_key_here') {
    console.log("⚠️  WARNING: GROQ_API_KEY not set. AI features will not work.");
  }
});

