const mongoose = require('mongoose');

const heroBgSchema = mongoose.Schema(
    {
        imageUrl: {
            type: String,
            required: [true, 'Image URL is required'],
        },
        cloudinaryId: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('HeroBg', heroBgSchema);
