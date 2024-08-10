const express = require('express');
const router = express.Router();
const Profile = require('../models/profileModel');

router.get('/:profileId', async (req, res) => {
    const { profileId } = req.params;

    try {
        const profile = await Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;