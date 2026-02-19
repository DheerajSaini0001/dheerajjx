const mongoose = require('mongoose');

const thoughtSchema = mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Please add content']
    },
    author: {
        type: String,
        default: 'Admin'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Thought', thoughtSchema);
