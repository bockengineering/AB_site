require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const podcastRoutes = require('./routes/podcastRoutes');
const readRoutes = require('./routes/readRoutes');

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://alexbock.io' 
    : 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// API routes
app.use('/api', podcastRoutes);
app.use('/api', readRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message || 'Something broke!' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
}); 