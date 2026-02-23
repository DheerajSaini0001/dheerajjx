const mongoose = require('mongoose');

const thoughtSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    excerpt: {
        type: String,
        required: [true, 'Please add an excerpt preview']
    },
    content: {
        type: String,
        required: [true, 'Please add the full essay content']
    },
    category: {
        type: String,
        required: [true, 'Please select a category dropdown']
    },
    readTime: {
        type: String,
        required: [true, 'Please add a read time estimate']
    },
    date: {
        type: String,
        required: [true, 'Please add a publication date'] // E.g., 'Feb 20, 2026'
    },
    gradient: {
        type: String,
        default: 'from-violet-500 to-purple-500' // Randomly injected by backend if omitted
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Thought', thoughtSchema);
