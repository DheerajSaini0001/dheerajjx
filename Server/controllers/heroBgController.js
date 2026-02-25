const asyncHandler = require('express-async-handler');
const HeroBg = require('../models/HeroBg');
const cloudinary = require('../config/cloudinary');

// @desc  Get all active hero bg images
// @route GET /api/herobg
// @access Public
const getHeroBgs = asyncHandler(async (req, res) => {
    const images = await HeroBg.find({ active: true }).sort({ createdAt: -1 });
    res.status(200).json(images);
});

// @desc  Upload a new hero bg image
// @route POST /api/herobg
// @access Private (Admin)
const createHeroBg = asyncHandler(async (req, res) => {
    if (!req.file) {
        res.status(400);
        throw new Error('Please upload an image file');
    }

    let imageUrl = '';
    let cloudinaryId = '';

    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'hero_backgrounds',
            timeout: 60000,
        });
        imageUrl = result.secure_url;
        cloudinaryId = result.public_id;
    } catch (err) {
        console.warn('Cloudinary error, falling back to local:', err.message);
        imageUrl = `http://localhost:201/uploads/${req.file.filename}`;
    }

    const heroBg = await HeroBg.create({
        imageUrl,
        cloudinaryId,
        label: req.body.label || '',
    });

    res.status(201).json(heroBg);
});

// @desc  Delete a hero bg image
// @route DELETE /api/herobg/:id
// @access Private (Admin)
const deleteHeroBg = asyncHandler(async (req, res) => {
    const heroBg = await HeroBg.findById(req.params.id);
    if (!heroBg) {
        res.status(404);
        throw new Error('Hero background not found');
    }

    // Try to remove from Cloudinary
    if (heroBg.cloudinaryId) {
        try {
            await cloudinary.uploader.destroy(heroBg.cloudinaryId);
        } catch (e) {
            console.warn('Could not remove from Cloudinary:', e.message);
        }
    }

    await heroBg.deleteOne();
    res.status(200).json({ id: req.params.id, message: 'Hero background deleted' });
});

module.exports = { getHeroBgs, createHeroBg, deleteHeroBg };
