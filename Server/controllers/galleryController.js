const asyncHandler = require('express-async-handler');
const Gallery = require('../models/Gallery');
const cloudinary = require('../config/cloudinary');

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
const getGallery = asyncHandler(async (req, res) => {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json(images);
});

// @desc    Create a gallery image
// @route   POST /api/gallery
// @access  Private (Admin)
const createGallery = asyncHandler(async (req, res) => {
    const { title, category, iso, shutter, aperture } = req.body;

    if (!title || !category || !req.file) {
        res.status(400);
        throw new Error('Please include at least a title, category, and an image file');
    }

    try {
        let imageUrl = '';
        try {
            // Upload image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'gallery_portfolio',
                timeout: 60000
            });
            imageUrl = result.secure_url;
        } catch (cloudError) {
            console.warn('Cloudinary Error Details (Falling back to Local Storage):', cloudError);
            imageUrl = `http://localhost:201/uploads/${req.file.filename}`;
        }

        const galleryItem = await Gallery.create({
            title,
            category,
            iso: iso || 'ISO 100',
            shutter: shutter || '1/250s',
            aperture: aperture || 'f/2.8',
            imageUrl
        });

        res.status(201).json(galleryItem);

    } catch (error) {
        console.error('Database Creation Error:', error);
        res.status(500);
        throw new Error('Failed to create gallery item: ' + (error.message || JSON.stringify(error)));
    }
});

// @desc    Delete a gallery image
// @route   DELETE /api/gallery/:id
// @access  Private (Admin)
const deleteGallery = asyncHandler(async (req, res) => {
    const galleryItem = await Gallery.findById(req.params.id);

    if (!galleryItem) {
        res.status(404);
        throw new Error('Gallery image not found');
    }

    await galleryItem.deleteOne();

    res.status(200).json({ id: req.params.id, message: 'Gallery image deleted' });
});

module.exports = {
    getGallery,
    createGallery,
    deleteGallery
};
