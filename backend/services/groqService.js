const axios = require('axios');
const { getSystemPrompt } = require('../utils/promptBuilder');

async function classifyWithGroq(content, type) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error('Groq API key not configured');
  }

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: getSystemPrompt() },
          { role: "user", content: `Content type: ${type}\n\nContent to analyze:\n${content}` }
        ],
        temperature: 0.1,
        max_tokens: 800,
        response_format: { type: "json_object" }
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const extractedText = response.data.choices[0].message.content;
    let parsedJson;

    try {
      parsedJson = JSON.parse(extractedText);
    } catch (parseError) {
      throw new Error("AI returned malformed response");
    }

    const {
      category,
      severity,
      confidence,
      explanation,
      indicators,
      advice,
      educational_tip
    } = parsedJson;

    if (
      category === undefined ||
      severity === undefined ||
      confidence === undefined ||
      explanation === undefined ||
      indicators === undefined ||
      advice === undefined ||
      educational_tip === undefined
    ) {
      throw new Error("Invalid response structure from AI");
    }

    return parsedJson;

  } catch (error) {
    if (error.response) {
      console.error("Groq API Error Response:", error.response.data);
      if (error.response.status === 401) throw new Error("Invalid Groq API key");
      if (error.response.status === 429) throw new Error("Groq rate limit reached, try again later");
      if (error.response.status === 402) throw new Error("Groq quota exceeded");
    }
    
    if (error.message === "AI returned malformed response" || error.message === "Invalid response structure from AI" || error.message === "Groq API key not configured") {
      throw error;
    }

    console.error("Groq fallback error:", error.message);
    throw new Error("Cannot reach Groq API");
  }
}

module.exports = {
  classifyWithGroq
};

