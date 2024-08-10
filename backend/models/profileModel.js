
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    bio: String,
    education: [{
        institution: String,
        degree: String,
        duration: String
    }],
    experience: [{
        company: String,
        position: String,
        duration: String
    }]
});

module.exports = mongoose.model('Profile', profileSchema);