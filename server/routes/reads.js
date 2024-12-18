const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const router = express.Router();

router.get('/reads', (req, res) => {
  try {
    const results = [];
    const filePath = path.join(__dirname, '../data/reads.csv');
    
    console.log('Attempting to read file at:', filePath);
    
    if (!fs.existsSync(filePath)) {
      console.error('File does not exist at path:', filePath);
      return res.status(404).json({ message: 'CSV file not found' });
    }

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        console.log('Read row:', data);
        results.push(data);
      })
      .on('end', () => {
        console.log('Total rows read:', results.length);
        console.log('Results:', results);
        res.json(results);
      })
      .on('error', (error) => {
        console.error('Error reading CSV:', error);
        res.status(500).json({ message: 'Error reading CSV file' });
      });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;