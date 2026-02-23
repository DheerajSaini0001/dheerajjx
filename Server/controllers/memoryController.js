const asyncHandler = require('express-async-handler');
const Memory = require('../models/Memory');
const cloudinary = require('../config/cloudinary');

// @desc    Get all memories
// @route   GET /api/memories
// @access  Public
const getMemories = asyncHandler(async (req, res) => {
    // Sort by createdAt descending
    const memories = await Memory.find().sort({ createdAt: -1 });
    res.status(200).json(memories);
});

// @desc    Create a memory
// @route   POST /api/memories
// @access  Private (Admin)
const createMemory = asyncHandler(async (req, res) => {
    const { title, location, date, category, quote } = req.body;

    // Validate inputs
    if (!title || !location || !date || !category || !quote || !req.file) {
        res.status(400);
        throw new Error('Please include all fields and an image file');
    }

    try {
        let imageUrl = '';
        try {
            // Attempt remote Cloudinary ingest
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'memories_portfolio',
                timeout: 60000 // 60 seconds strict timeout
            });
            imageUrl = result.secure_url;
        } catch (cloudError) {
            console.warn('Cloudinary Error Details (Falling back to Local Storage):', cloudError);
            // Graceful Fallback: Use multer's local static hosted file directly
            imageUrl = `http://localhost:201/uploads/${req.file.filename}`;
        }

        const memory = await Memory.create({
            title,
            location,
            date,
            category,
            quote,
            imageUrl
        });

        res.status(201).json(memory);

    } catch (error) {
        console.error('Database Creation Error:', error);
        res.status(500);
        throw new Error('Failed to create memory archive: ' + (error.message || JSON.stringify(error)));
    }
});

// @desc    Update a memory
// @route   PUT /api/memories/:id
// @access  Private (Admin)
const updateMemory = asyncHandler(async (req, res) => {
    const memory = await Memory.findById(req.params.id);

    if (!memory) {
        res.status(404);
        throw new Error('Memory not found');
    }

    const { title, location, date, category, quote } = req.body;
    let imageUrl = memory.imageUrl;

    try {
        // If there's a new file, upload to Cloudinary
        if (req.file) {
            try {
                // Attempt remote Cloudinary ingest
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'memories_portfolio',
                    timeout: 60000
                });
                imageUrl = result.secure_url;
            } catch (cloudError) {
                console.warn('Cloudinary Error Details (Falling back to Local Storage):', cloudError);
                imageUrl = `http://localhost:201/uploads/${req.file.filename}`;
            }
        }

        const updatedMemory = await Memory.findByIdAndUpdate(
            req.params.id,
            { title, location, date, category, quote, imageUrl },
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedMemory);

    } catch (error) {
        console.error('Update Failed:', error);
        res.status(500);
        throw new Error('Update Failed: ' + (error.message || JSON.stringify(error)));
    }
});

// @desc    Delete a memory
// @route   DELETE /api/memories/:id
// @access  Private (Admin)
const deleteMemory = asyncHandler(async (req, res) => {
    const memory = await Memory.findById(req.params.id);

    if (!memory) {
        res.status(404);
        throw new Error('Memory not found');
    }

    await memory.deleteOne();

    res.status(200).json({ id: req.params.id, message: 'Memory deleted' });
});

module.exports = {
    getMemories,
    createMemory,
    updateMemory,
    deleteMemory,
};
