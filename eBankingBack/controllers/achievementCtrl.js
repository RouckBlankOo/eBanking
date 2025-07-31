
const Achievement = require('../models/Achievement');

async function createAchievement(req, res) {
  try {
    const achievement = new Achievement(req.body);
    await achievement.save();
    res.status(201).json({ success: true, achievement });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function getUserAchievements(req, res) {
  try {
    const achievements = await Achievement.find({ userId: req.params.userId });
    res.json({ success: true, achievements });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function getAchievement(req, res) {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) return res.status(404).json({ success: false, message: 'Achievement not found' });
    res.json({ success: true, achievement });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function updateAchievement(req, res) {
  try {
    const achievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!achievement) return res.status(404).json({ success: false, message: 'Achievement not found' });
    res.json({ success: true, achievement });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function deleteAchievement(req, res) {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);
    if (!achievement) return res.status(404).json({ success: false, message: 'Achievement not found' });
    res.json({ success: true, message: 'Achievement deleted' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

module.exports = {
  createAchievement,
  getUserAchievements,
  getAchievement,
  updateAchievement,
  deleteAchievement
};
