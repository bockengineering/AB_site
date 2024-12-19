const mongoose = require('mongoose');

const ReadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  publication: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  link: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Read', ReadSchema); 