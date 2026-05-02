const express = require('express');
const { chatController } = require('../controllers/chatController');
const apiLimiter = require('../middlewares/rateLimiter');

const router = express.Router();

router.post('/chat', apiLimiter, chatController);

router.get('/chat', (req, res) => {
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

module.exports = router;
