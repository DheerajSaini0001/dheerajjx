const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    category: {
        type: String,
        required: [true, 'Please add a category']
    },
    iso: {
        type: String,
        required: [true, 'Please add ISO setting']
    },
    shutter: {
        type: String,
        required: [true, 'Please add shutter speed']
    },
    aperture: {
        type: String,
        required: [true, 'Please add aperture priority']
    },
    imageUrl: {
        type: String,
        required: [true, 'Please add an image URL']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Gallery', gallerySchema);
