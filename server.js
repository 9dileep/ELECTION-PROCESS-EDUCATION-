const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to parse JSON
app.use(express.json());

// Serve static files (HTML, CSS, JS) from the current directory
app.use(express.static(path.join(__dirname)));

/**
 * SECURE PROXY FOR GEMINI AI
 * This keeps your API key safe on the server and prevents users from stealing it.
 */
app.post('/api/chat', async (req, res) => {
  const { question } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Gemini API key is not configured on the server.' });
  }

  const systemPrompt = `You are ElectED, an expert election education assistant. Answer questions about the U.S. election process clearly and accurately. Keep answers concise (under 200 words), friendly, and educational. Use bullet points or numbered lists when helpful.`;

  try {
    // 1. First, get list of models to find the best available one (Flash or Pro)
    const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const listData = await listRes.json();
    const availableModels = listData.models ? listData.models.map(m => m.name) : [];
    
    const modelToUse = availableModels.find(m => m.includes('1.5-flash') && !m.includes('8b')) || 
                       availableModels.find(m => m.includes('1.5-flash')) || 
                       availableModels.find(m => m.includes('gemini-1.5-pro')) || 
                       availableModels[0] || 'models/gemini-1.5-flash';

    // 2. Call Gemini
    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/${modelToUse}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: `${systemPrompt}\n\nUser question: ${question}` }] }] })
    });

    const data = await geminiRes.json();
    
    if (!geminiRes.ok) {
      console.error('Gemini API Error:', data);
      return res.status(geminiRes.status).json(data);
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response content.';
    res.json({ reply });

  } catch (error) {
    console.error('Server error during chat:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Catch-all 404 handler — logs the exact missing file path
app.use((req, res) => {
  console.warn(`⚠️  404 Not Found: ${req.method} ${req.url}`);
  res.status(404).send(`404 – File not found: ${req.url}`);
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 ElectED Server running on http://localhost:${PORT}`);
  console.log(`🔒 Gemini API Proxy active at /api/chat`);
  console.log(`🔑 Gemini API Key: ${process.env.GEMINI_API_KEY ? '✅ Loaded' : '❌ MISSING – set GEMINI_API_KEY env var'}`);
});
