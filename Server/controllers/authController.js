// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    res.status(200).json({ message: 'Register User' });
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    res.status(200).json({ message: 'Login User' });
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    res.status(200).json({ message: 'User data display' });
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
};
