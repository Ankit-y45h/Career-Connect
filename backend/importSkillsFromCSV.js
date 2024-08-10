const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const Skill = require('./models/Skill');

mongoose.connect('process.env.MONGO_URI', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const skills = [];

fs.createReadStream('skills_counts.csv') // Adjust the filename here
  .pipe(csv())
  .on('data', (row) => {
    const skillName = row.skill;
    skills.push(skillName);
  })
  .on('end', async () => {
    console.log('CSV file successfully processed.');
    console.log('Skills:', skills);
    await saveSkillsToDatabase(skills);
    db.close();
  });

async function saveSkillsToDatabase(skills) {
  try {
    for (const skillName of skills) {
      const skill = new Skill({ name: skillName });
      await skill.save();
    }
    console.log('Skills saved to database successfully.');
  } catch (error) {
    console.error('Error saving skills to database:', error);
  }
}