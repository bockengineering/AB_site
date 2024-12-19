const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();
const connectDB = require('./config/db');
const readsRoute = require('./routes/reads');
const path = require('path');

const app = express();

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://alexbock.io'  // Replace with your actual domain
    : 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI environment variable is not set');
  process.exit(1);
}

const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  ssl: true,
  authSource: 'admin',
  retryWrites: true,
  w: 'majority'
};

if (process.env.NODE_ENV === 'production') {
  connectOptions.sslValidate = true;
  connectOptions.sslCA = process.env.SSL_CERT;
}

mongoose.connect(MONGODB_URI, connectOptions)
.then(() => {
  console.log('MongoDB Connected...');
  console.log('Connection string used (redacted):', 
    MONGODB_URI.replace(/\/\/.*@/, '//***:***@'));
})
.catch(err => {
  console.error('MongoDB connection error details:', {
    name: err.name,
    message: err.message,
    code: err.code,
    reason: err.reason
  });
  process.exit(1);
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt for username:', username);
    
    // Find user in MongoDB
    const user = await User.findOne({ username });
    console.log('User found:', user ? 'Yes' : 'No');
    
    if (!user) {
      console.log('No user found with username:', username);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    console.log('Password valid:', validPassword);

    if (!validPassword) {
      console.log('Invalid password for user:', username);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );

    console.log('Login successful for user:', username);
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create initial admin user (run this once)
app.post('/api/create-admin', async (req, res) => {
  try {
    const { adminKey, username, password } = req.body;
    
    // Verify admin key from environment variables
    if (adminKey !== process.env.ADMIN_KEY) {
      return res.status(401).json({ message: 'Invalid admin key' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword
    });

    await user.save();
    res.status(201).json({ message: 'Admin user created successfully' });
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected apps endpoint
app.get('/api/apps', authenticateToken, async (req, res) => {
  try {
    // In a real app, you might want to store apps in MongoDB as well
    const apps = [
      {
        id: 1,
        name: 'App 1',
        description: 'Description for App 1',
        url: 'http://localhost:3001/app1'
      },
      {
        id: 2,
        name: 'App 2',
        description: 'Description for App 2',
        url: 'http://localhost:3002/app2'
      }
    ];

    res.json(apps);
  } catch (error) {
    console.error('Fetch apps error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Connect to database
connectDB();

// Use routes
app.use('/api', readsRoute);

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, '../client/build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
