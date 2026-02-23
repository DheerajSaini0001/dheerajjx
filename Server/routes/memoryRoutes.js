const express = require('express');
const router = express.Router();
const { getMemories, createMemory, updateMemory, deleteMemory } = require('../controllers/memoryController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); // Standard multer setup

router.route('/')
    .get(getMemories)
    .post(protect, upload.single('image'), createMemory);

router.route('/:id')
    .put(protect, upload.single('image'), updateMemory)
    .delete(protect, deleteMemory);

module.exports = router;
