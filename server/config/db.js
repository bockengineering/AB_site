const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const connectOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      retryWrites: true,
      w: 'majority',
      ssl: true,
      tls: true,
      tlsAllowInvalidCertificates: process.env.NODE_ENV !== 'production'
    };

    await mongoose.connect(process.env.MONGODB_URI, connectOptions);
    console.log('MongoDB Connected...');
    console.log('Connection string used (redacted):', 
      process.env.MONGODB_URI.replace(/\/\/.*@/, '//***:***@'));
  } catch (err) {
    console.error('MongoDB connection error details:', {
      name: err.name,
      message: err.message,
      code: err.code,
      reason: err.reason
    });
    process.exit(1);
  }
};

module.exports = connectDB;
