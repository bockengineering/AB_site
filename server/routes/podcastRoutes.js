const express = require('express');
const router = express.Router();
const { getPodcasts, getPodcastNotes } = require('../controllers/podcastController');

router.get('/podcasts', getPodcasts);
router.get('/podcasts/:id', getPodcastNotes);

module.exports = router; 