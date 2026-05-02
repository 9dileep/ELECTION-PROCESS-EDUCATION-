const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const helmetConfig = require('./config/helmetConfig');
const apiRoutes = require('./routes/api');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// HTTP request logging (skip in test environment for clean test output)
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

// Apply security and performance middlewares
app.use(helmetConfig);
app.use(cors());
app.use(compression());
app.use(express.json({ limit: '50kb' })); // Strict payload size limit

// Serve static files with cache headers
app.use(express.static(path.join(__dirname, '../public'), {
  maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0,
  etag: true,
}));

// API Routes
app.use('/api', apiRoutes);

// Catch-all 404 handler
app.use((req, res) => {
  console.warn(`⚠️  404 Not Found: ${req.method} ${req.url}`);
  res.status(404).send(`404 – File not found: ${req.url}`);
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
