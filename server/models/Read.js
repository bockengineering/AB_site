const mongoose = require('mongoose');

const readSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  link: String,
  notes: String,
  rating: Number
});

module.exports = mongoose.model('Read', readSchema); 