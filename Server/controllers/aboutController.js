// @desc    Get about info
// @route   GET /api/about
// @access  Public
const getAbout = async (req, res) => {
    res.status(200).json({ message: 'Get about info' });
};

// @desc    Update about info
// @route   PUT /api/about
// @access  Private (Admin)
const updateAbout = async (req, res) => {
    res.status(200).json({ message: 'Update about info' });
};

module.exports = {
    getAbout,
    updateAbout,
};
