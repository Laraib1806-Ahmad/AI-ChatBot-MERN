require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

(async () => {
  try {
    console.log('🧪 Testing Gemini API...');

    const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
    const result = await ai.models.generateContent({
      model,
      contents: 'Hello, reply with OK',
    });
    console.log('✅ Gemini Working!');
    console.log(result.text);
  } catch (err) {
    console.error('❌ Gemini Error:', err.message);
  }
})();
