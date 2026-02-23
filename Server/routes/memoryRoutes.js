const express = require('express');
const router = express.Router();
const { getMemories, getMemory, createMemory, updateMemory, deleteMemory } = require('../controllers/memoryController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); // Standard multer setup

router.route('/')
    .get(getMemories)
    .post(protect, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'gallery', maxCount: 10 }]), createMemory);

router.route('/:id')
    .get(getMemory)
    .put(protect, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'gallery', maxCount: 10 }]), updateMemory)
    .delete(protect, deleteMemory);

module.exports = router;
