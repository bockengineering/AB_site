const Read = require('../models/Read');

const getReads = async (req, res) => {
  try {
    const reads = await Read.find().sort({ date: -1 });
    res.json(reads);
  } catch (error) {
    console.error('Error fetching reads:', error);
    res.status(500).json({ error: 'Failed to fetch reads' });
  }
};

module.exports = {
  getReads
}; 