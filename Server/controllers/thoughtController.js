// @desc    Get all thoughts
// @route   GET /api/thoughts
// @access  Public
const getThoughts = async (req, res) => {
    res.status(200).json({ message: 'Get all thoughts' });
};

// @desc    Create a thought
// @route   POST /api/thoughts
// @access  Private (Admin)
const createThought = async (req, res) => {
    res.status(200).json({ message: 'Create thought' });
};

module.exports = {
    getThoughts,
    createThought,
};
