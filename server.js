const dotenv = require('dotenv');

// Load .env ONLY if GEMINI_API_KEY is not already set in the environment
// This prevents .env from overriding an exported shell variable
if (!process.env.GEMINI_API_KEY) {
  dotenv.config();
}

const app = require('./src/app');

const PORT = process.env.PORT || 8080;

if (require.main === module) {
  const server = app.listen(PORT, () => {
    const keyStatus = process.env.GEMINI_API_KEY
      ? `✅ Loaded (ends in ...${process.env.GEMINI_API_KEY.slice(-4)})`
      : '❌ MISSING — run: export GEMINI_API_KEY="your-key"';
    console.log(`🚀 ElectED Server running on http://localhost:${PORT}`);
    console.log(`🔒 Gemini Proxy active at POST /api/chat`);
    console.log(`🔑 Gemini API Key: ${keyStatus}`);
  });

  // Graceful shutdown handling
  process.on('SIGTERM', () => {
    console.info('SIGTERM signal received. Closing HTTP server.');
    server.close(() => {
      console.log('HTTP server closed.');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.info('SIGINT signal received. Closing HTTP server.');
    server.close(() => {
      console.log('HTTP server closed.');
      process.exit(0);
    });
  });
}

module.exports = app;
