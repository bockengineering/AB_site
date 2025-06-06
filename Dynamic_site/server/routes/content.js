const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// @route   GET api/content/projects
// @desc    Get all projects
// @access  Public
router.get('/projects', async (req, res) => {
  try {
    const projects = [
      {
        name: "RQ4-B Dynamic Mission Operations (DYNAMO)",
        description: "Northrop Grumman was awarded a contract by the United States Air Force to provide dynamic inflight rerouting for RQ-4B Global Hawk.",
        image: "images/Global-Hawk.jpg",
        link: "https://news.northropgrumman.com/news/releases/northrop-grumman-awarded-mission-planning-contract-to-increase-global-hawk-operational-flexibility"
      },
      {
        name: "Microturbine Jetpack for Red Bull Air Race",
        description: "We developed and flew a cutting-edge microturbine jetpack for the Red Bull Air Race. We were the first to fly a turbine-powered manned VTOL device safely and successfully",
        image: "images/jetpack.jpg",
        link: "https://www.youtube.com/watch?v=GFadyUqRKek"
      }
    ];
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/content/listens
// @desc    Get all listens
// @access  Public
router.get('/listens', async (req, res) => {
  try {
    const listens = [
      {
        type: 'youtube',
        embedId: 'tBU5UPI03Rg',
        title: 'Ep19. State of Venture, AI Scaling, Elections | BG2 w/ Bill Gurley, Brad Gerstner, & Jamin Ball',
        host: 'Bg2 Pod'
      },
      {
        type: 'spotify',
        embedId: '6mvT6nqdjXEGQ83dRrWIKp',
        title: 'Your Spotify Episode Title',
        host: 'Podcast Name'
      }
    ];
    res.json(listens);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
