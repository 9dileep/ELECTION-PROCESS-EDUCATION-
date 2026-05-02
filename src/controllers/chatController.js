const fetch = require('node-fetch');

const chatController = async (req, res, next) => {
  try {
    const { question } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    // Validate: missing or empty question
    if (!question || typeof question !== 'string' || !question.trim()) {
      return res.status(400).json({ error: 'No question provided.' });
    }

    // Validate: enforce max input length to prevent abuse
    const MAX_QUESTION_LENGTH = 500;
    if (question.trim().length > MAX_QUESTION_LENGTH) {
      return res.status(400).json({
        error: `Question too long. Please keep it under ${MAX_QUESTION_LENGTH} characters.`
      });
    }

    // Guard: missing API key
    if (!apiKey) {
      console.error('❌ GEMINI_API_KEY is not set.');
      return res.status(500).json({ error: 'Gemini API key is not configured on the server.' });
    }

    const systemPrompt = `You are ElectED, an expert election education assistant. Answer questions about the U.S. election process clearly and accurately. Keep answers concise (under 200 words), friendly, and educational. Use bullet points or numbered lists when helpful.`;

    const MODEL = 'gemini-2.5-flash';
    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

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
      console.error(`❌ Gemini API error ${geminiRes.status}:`, JSON.stringify(data, null, 2));
      return res.status(502).json({
        error: `Gemini API returned ${geminiRes.status}`,
        details: data?.error?.message || 'Unknown error'
      });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response content.';
    console.log(`✅ /api/chat → replied (${reply.length} chars)`);
    res.json({ reply });

  } catch (error) {
    next(error);
  }
};

module.exports = { chatController };
