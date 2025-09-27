require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const podcastRoutes = require('./routes/podcastRoutes');
const readRoutes = require('./routes/readRoutes');

// Middleware for handling malformed URLs
app.use((req, res, next) => {
  try {
    // Decode the URL to check for malformed characters
    decodeURIComponent(req.url);
    next();
  } catch (error) {
    console.error('Malformed URL detected:', req.url);
    return res.status(400).json({ 
      error: 'Invalid URL format',
      message: 'The requested URL contains invalid characters'
    });
  }
});

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://alexbock.io' 
    : 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use('/api', podcastRoutes);
app.use('/api', readRoutes);

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: 'API endpoint not found'
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, '../client/build'), {
    // Security headers for static files
    setHeaders: (res, path) => {
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'DENY');
      res.setHeader('X-XSS-Protection', '1; mode=block');
    }
  }));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Handle specific error types
  if (err.name === 'URIError') {
    return res.status(400).json({ 
      error: 'Invalid URL format',
      message: 'The requested URL contains invalid characters'
    });
  }
  
  if (err.name === 'APIResponseError') {
    return res.status(err.status || 500).json({ 
      error: 'API Error',
      message: err.message || 'External API request failed'
    });
  }
  
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong' 
      : err.message || 'Something broke!'
  });
});

// Process error handlers
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
}); 