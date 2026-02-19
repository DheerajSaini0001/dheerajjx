const express = require('express');
const router = express.Router();
const { getMemories, createMemory } = require('../controllers/memoryController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getMemories).post(protect, createMemory);

module.exports = router;
