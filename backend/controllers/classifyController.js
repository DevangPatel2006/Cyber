const { classifyWithGroq } = require('../services/groqService');

const classifyContent = async (req, res, next) => {
  try {
    const { content, type } = req.body;
    
    // The actual AI logic
    const aiResult = await classifyWithGroq(content, type);
    
    // Return success response
    res.status(200).json({
      success: true,
      data: aiResult
    });
  } catch (error) {
    // Pass to global error handler
    next(error);
  }
};

module.exports = {
  classifyContent
};
