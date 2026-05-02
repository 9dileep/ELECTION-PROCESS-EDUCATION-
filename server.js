const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
// Load .env ONLY if GEMINI_API_KEY is not already set in the environment
// This prevents .env from overriding an exported shell variable
if (!process.env.GEMINI_API_KEY) {
  dotenv.config();
}

const app = express();
const PORT = process.env.PORT || 8080;

app.use(helmet({
  contentSecurityPolicy: false, // Disabling CSP for this educational app to allow inline scripts and free APIs
}));
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * SECURE PROXY FOR GEMINI AI
 * Keeps API key server-side. Frontend calls /api/chat instead of Gemini directly.
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 50 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
});

app.post('/api/chat', apiLimiter, async (req, res) => {
  const { question } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  // Guard: missing question
  if (!question || !question.trim()) {
    return res.status(400).json({ error: 'No question provided.' });
  }

  // Guard: missing API key
  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY is not set. Run: export GEMINI_API_KEY="your-key"');
    return res.status(500).json({ error: 'Gemini API key is not configured on the server.' });
  }

  const systemPrompt = `You are ElectED, an expert election education assistant. Answer questions about the U.S. election process clearly and accurately. Keep answers concise (under 200 words), friendly, and educational. Use bullet points or numbered lists when helpful.`;

  // Use gemini-2.5-flash directly — no model listing needed
  const MODEL = 'gemini-2.5-flash';
  const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

  try {
    const geminiRes = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${systemPrompt}\n\nUser question: ${question}` }] }]
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      // Log full Gemini error to terminal so you can see exactly what's wrong
      console.error(`❌ Gemini API error ${geminiRes.status}:`, JSON.stringify(data, null, 2));
      return res.status(500).json({
        error: `Gemini API returned ${geminiRes.status}`,
        details: data?.error?.message || 'Unknown error'
      });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response content.';
    console.log(`✅ /api/chat → replied (${reply.length} chars)`);
    res.json({ reply });

  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('❌ Gemini API request timed out');
      return res.status(504).json({ error: 'Request to AI service timed out.' });
    }
    console.error('❌ Network/server error during chat:', error.message);
    res.status(500).json({ error: 'Failed to reach Gemini API. Check server logs.' });
  }
});

// Friendly message for accidental GET requests to the API
app.get('/api/chat', (req, res) => {
  res.send(`
    <html>
      <body style="font-family: sans-serif; text-align: center; margin-top: 50px;">
        <h2>🤖 ElectED API is running!</h2>
        <p>This endpoint only accepts POST requests.</p>
        <p>Please go to the <a href="/assistant.html">Ask AI Assistant page</a> to chat.</p>
      </body>
    </html>
  `);
});

// Catch-all 404 handler
app.use((req, res) => {
  console.warn(`⚠️  404 Not Found: ${req.method} ${req.url}`);
  res.status(404).send(`404 – File not found: ${req.url}`);
});

// Start the server only if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    const keyStatus = process.env.GEMINI_API_KEY
      ? `✅ Loaded (ends in ...${process.env.GEMINI_API_KEY.slice(-4)})`
      : '❌ MISSING — run: export GEMINI_API_KEY="your-key"';
    console.log(`🚀 ElectED Server running on http://localhost:${PORT}`);
    console.log(`🔒 Gemini Proxy active at POST /api/chat`);
    console.log(`🔑 Gemini API Key: ${keyStatus}`);
  });
}

module.exports = app;
