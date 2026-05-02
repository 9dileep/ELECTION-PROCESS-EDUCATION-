const errorHandler = (err, req, res, next) => {
  if (err.name === 'AbortError') {
    console.error('❌ API request timed out');
    return res.status(504).json({ error: 'Request to AI service timed out.' });
  }
  
  console.error('❌ Server Error:', err.message);
  res.status(500).json({ error: 'An unexpected error occurred. Please check server logs.' });
};

module.exports = errorHandler;
