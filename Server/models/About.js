const mongoose = require('mongoose');

const aboutSchema = mongoose.Schema({
    bio: {
        type: String,
        required: true
    },
    skills: [String],
    image: String
}, {
    timestamps: true
});

module.exports = mongoose.model('About', aboutSchema);
