// @desc    Get all memories
// @route   GET /api/memories
// @access  Public
const getMemories = async (req, res) => {
    res.status(200).json({ message: 'Get all memories' });
};

// @desc    Create a memory
// @route   POST /api/memories
// @access  Private (Admin)
const createMemory = async (req, res) => {
    res.status(200).json({ message: 'Create memory' });
};

module.exports = {
    getMemories,
    createMemory,
};
