const express = require('express');
const router = express.Router();
const { getFeed, getHealth, triggerSync } = require('../controllers/instagramController');
const { protect } = require('../middleware/authMiddleware');

// Public endpoints
router.get('/', getFeed);
router.get('/health', getHealth);

// Admin-only endpoint
router.post('/sync', protect, triggerSync);

module.exports = router;
