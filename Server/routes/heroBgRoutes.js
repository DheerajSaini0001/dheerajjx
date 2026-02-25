const express = require('express');
const router = express.Router();
const { getHeroBgs, createHeroBg, deleteHeroBg } = require('../controllers/heroBgController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
    .get(getHeroBgs)
    .post(protect, upload.single('image'), createHeroBg);

router.route('/:id')
    .delete(protect, deleteHeroBg);

module.exports = router;
