const axios = require('axios');
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

/**
 * Streams response from Google Gemini token-by-token
 * @param {string} prompt - User input message
 * @param {function} onDelta - Callback to send each token
 */
exports.getGeminiStream = async (prompt, onDelta) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateText?key=${GEMINI_API_KEY}`;

  try {
    const response = await axios.post(url, {
      prompt: { text: prompt },
      temperature: 0.7,
      candidateCount: 1
    });

    // Extract text from Gemini response
    const text = response.data.candidates[0].output[0].content[0].text || 'No response';

    // Simulate token-by-token streaming
    for (let i = 0; i < text.length; i++) {
      await new Promise(res => setTimeout(res, 50)); // 50ms delay per character
      onDelta(text[i]);
    }

  } catch (err) {
    console.error('Gemini API error:', err.message);
    onDelta(`Error: ${err.message}`);
  }
};
