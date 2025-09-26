const express = require('express');
const router = express.Router();
const { getReads } = require('../controllers/readController');

router.get('/reads', getReads);

module.exports = router; 