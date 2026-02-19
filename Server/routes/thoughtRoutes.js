const express = require('express');
const router = express.Router();
const { getThoughts, createThought } = require('../controllers/thoughtController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getThoughts).post(protect, createThought);

module.exports = router;
