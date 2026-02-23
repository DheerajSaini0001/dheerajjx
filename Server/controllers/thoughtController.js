const asyncHandler = require('express-async-handler');
const Thought = require('../models/Thought');

// @desc    Get all thoughts
// @route   GET /api/thoughts
// @access  Public
const getThoughts = asyncHandler(async (req, res) => {
    // Sort so newest essays are at the top
    const thoughts = await Thought.find().sort({ createdAt: -1 });
    res.status(200).json(thoughts);
});

// @desc    Create a thought
// @route   POST /api/thoughts
// @access  Private (Admin)
const createThought = asyncHandler(async (req, res) => {
    const { title, excerpt, content, category, readTime } = req.body;

    // Validate inputs
    if (!title || !excerpt || !content || !category || !readTime) {
        res.status(400);
        throw new Error('Please include all fields to draft an essay');
    }

    // Auto-generate a beautiful date string: "Feb 20, 2026"
    const parsedDate = new Date();
    const formattedDate = parsedDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    // Randomize a sick gradient color scheme for the card if omitted
    const gradients = [
        "from-pink-500 to-rose-500",
        "from-violet-500 to-purple-600",
        "from-cyan-500 to-blue-500",
        "from-amber-500 to-orange-500",
        "from-emerald-400 to-cyan-500"
    ];
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

    const thought = await Thought.create({
        title,
        excerpt,
        content,
        category,
        readTime,
        date: formattedDate,
        gradient: randomGradient
    });

    res.status(201).json(thought);
});

// @desc    Update a thought
// @route   PUT /api/thoughts/:id
// @access  Private (Admin)
const updateThought = asyncHandler(async (req, res) => {
    const thought = await Thought.findById(req.params.id);

    if (!thought) {
        res.status(404);
        throw new Error('Thought/Essay not found');
    }

    const updatedThought = await Thought.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    res.status(200).json(updatedThought);
});

// @desc    Delete a thought
// @route   DELETE /api/thoughts/:id
// @access  Private (Admin)
const deleteThought = asyncHandler(async (req, res) => {
    const thought = await Thought.findById(req.params.id);

    if (!thought) {
        res.status(404);
        throw new Error('Thought/Essay not found');
    }

    await thought.deleteOne();

    res.status(200).json({ id: req.params.id, message: 'Thought deleted' });
});

module.exports = {
    getThoughts,
    createThought,
    updateThought,
    deleteThought
};
