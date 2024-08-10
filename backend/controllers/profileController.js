const Profile = require('../models/profileModel');

const createProfile = async (userId, bio, education, experience) => {
    try {
        const profile = await Profile.create({ userId, bio, education, experience });
        return profile;
    } catch (error) {
        throw Error('Error creating profile');
    }
};

const getProfile = async (userId) => {
    try {
        const profile = await Profile.findOne({ userId });
        return profile;
    } catch (error) {
        throw Error('Error fetching profile');
    }
};

module.exports = { createProfile, getProfile };
