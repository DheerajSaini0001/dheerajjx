const mongoose = require('mongoose');

const instagramPostSchema = mongoose.Schema({
    instagramId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    caption: {
        type: String,
        default: null
    },
    mediaUrl: {
        type: String,
        required: true
    },
    mediaType: {
        type: String,
        enum: ['IMAGE', 'VIDEO', 'CAROUSEL_ALBUM'],
        required: true
    },
    permalink: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true,
        index: true
    },
    fetchedAt: {
        type: Date,
        default: Date.now
    },
    isDisplayed: {
        type: Boolean,
        default: true
    },
    syncStatus: {
        type: String,
        enum: ['pending', 'synced', 'error'],
        default: 'synced'
    }
}, {
    timestamps: true
});

// Index for efficient queries
instagramPostSchema.index({ timestamp: -1 });
instagramPostSchema.index({ syncStatus: 1 });

module.exports = mongoose.model('InstagramPost', instagramPostSchema);
