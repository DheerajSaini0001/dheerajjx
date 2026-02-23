const express = require('express');
const router = express.Router();
const { getThoughts, createThought, updateThought, deleteThought } = require('../controllers/thoughtController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(getThoughts)
    .post(protect, createThought);

router.route('/:id')
    .put(protect, updateThought)
    .delete(protect, deleteThought);

module.exports = router;
