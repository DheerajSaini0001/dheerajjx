const mongoose = require('mongoose');

const memorySchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    location: {
        type: String,
        required: [true, 'Please add a location']
    },
    date: {
        type: String,
        required: [true, 'Please add a date']
    },
    category: {
        type: String,
        required: [true, 'Please add a category']
    },
    quote: {
        type: String,
        required: [true, 'Please add a quote']
    },
    imageUrl: {
        type: String,
        required: [true, 'Please add an image url']
    },
    gallery: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Memory', memorySchema);
