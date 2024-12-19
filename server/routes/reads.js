const express = require('express');
const Read = require('../models/Read');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    console.log('Fetching reads...');
    const reads = await Read.find().sort({ date: -1 });
    console.log('Found reads:', reads);
    res.json(reads);
  } catch (error) {
    console.error('Error in reads route:', error);
    res.status(500).json({ error: 'Failed to fetch reads' });
  }
});

// Add new read (protected route)
router.post('/', async (req, res) => {
  try {
    const newRead = new Read(req.body);
    await newRead.save();
    res.status(201).json(newRead);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add read' });
  }
});

module.exports = router;