const mongoose = require('mongoose');
const Read = require('../server/models/Read');
require('dotenv').config();

const reads = [
  {
    title: "The Future of AI",
    author: "Sam Altman",
    publication: "OpenAI Blog",
    date: new Date("2024-01-15"),
    link: "https://openai.com/blog/future-of-ai"
  },
  {
    title: "Deep Tech Investments",
    author: "Paul Graham",
    publication: "Y Combinator",
    date: new Date("2024-01-10"),
    link: "https://www.ycombinator.com/deep-tech"
  }
];

async function seedReads() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Read.deleteMany({});
    await Read.insertMany(reads);
    console.log('Reads seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding reads:', error);
    process.exit(1);
  }
}

seedReads(); 