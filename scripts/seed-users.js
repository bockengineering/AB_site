const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../server/models/User');

const users = [
  {
    username: 'alex_bock',
    password: 'admin123', // Will be hashed
    role: 'admin'
  },
  {
    username: 'test_user',
    password: 'test123', // Will be hashed
    role: 'user'
  }
];

async function seedUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB...');

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Hash passwords and create users
    const hashedUsers = await Promise.all(users.map(async user => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return {
        ...user,
        password: hashedPassword,
        created_at: new Date()
      };
    }));

    // Insert users
    await User.insertMany(hashedUsers);
    console.log('Users seeded successfully');

    // Disconnect
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
}

seedUsers(); 