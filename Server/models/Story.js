const mongoose = require('mongoose');

const highlightSchema = new mongoose.Schema({
    icon: { type: String, default: '🎯' },
    label: { type: String, default: '' },
    value: { type: String, default: '' },
    color: { type: String, default: 'from-pink-500 to-rose-500' },
    glow: { type: String, default: 'hover:shadow-pink-500/20' },
});

const chapterSchema = new mongoose.Schema({
    title: { type: String, default: '' },
    lines: [String],
    order: { type: Number, default: 0 },
});

const storySchema = new mongoose.Schema(
    {
        highlights: { type: [highlightSchema], default: [] },
        chapters: { type: [chapterSchema], default: [] },
        signatureQuote: { type: String, default: '' },
        signatureTags: { type: [String], default: [] },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Story', storySchema);
