const express = require('express');
const router = express.Router();
const { getStory, updateStory } = require('../controllers/storyController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getStory).put(protect, updateStory);

module.exports = router;
