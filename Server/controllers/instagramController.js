const asyncHandler = require('express-async-handler');
const { getCachedFeed, getHealthInfo, syncInstagramPosts } = require('../utils/instagramService');

// @desc    Get Instagram feed posts
// @route   GET /api/feed
// @access  Public
const getFeed = asyncHandler(async (req, res) => {
    const limit = Math.min(parseInt(req.query.limit) || 12, 50);
    const offset = parseInt(req.query.offset) || 0;
    const type = req.query.type || null;

    const feedData = await getCachedFeed(limit, offset, type);
    res.status(200).json(feedData);
});

// @desc    Get system health status
// @route   GET /api/feed/health
// @access  Public
const getHealth = asyncHandler(async (req, res) => {
    const health = await getHealthInfo();
    res.status(200).json(health);
});

// @desc    Manually trigger a sync (admin only)
// @route   POST /api/feed/sync
// @access  Private (Admin)
const triggerSync = asyncHandler(async (req, res) => {
    const result = await syncInstagramPosts();
    res.status(200).json({
        success: true,
        message: 'Sync completed',
        ...result
    });
});

module.exports = {
    getFeed,
    getHealth,
    triggerSync
};
