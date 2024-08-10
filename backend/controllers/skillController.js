// controllers/skillController.js

const Skill = require('../models/Skills');

// Controller function to get all skills
exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to create a new skill
exports.createSkill = async (req, res) => {
  try {
    const newSkill = await Skill.create(req.body);
    res.status(201).json(newSkill);
  } catch (error) {
    console.error('Error creating skill:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to delete a skill
exports.deleteSkill = async (req, res) => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.skillId);
    if (!deletedSkill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    res.status(204).end(); // No content to send back
  } catch (error) {
    console.error('Error deleting skill:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

