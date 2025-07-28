// achievement.js
const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');
const { body, validationResult } = require('express-validator');

/**
 * @swagger
 * tags:
 *   name: Achievement
 *   description: User achievement management
 */

// Create achievement
router.post('/', [
  body('user_id').notEmpty(),
  body('type').notEmpty(),
  body('title').notEmpty(),
  body('description').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const achievement = new Achievement(req.body);
    await achievement.save();
    res.status(201).json(achievement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all achievements for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const achievements = await Achievement.find({ user_id: req.params.userId });
    res.json(achievements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single achievement
router.get('/:id', async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) return res.status(404).json({ error: 'Achievement not found' });
    res.json(achievement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update achievement
router.put('/:id', async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!achievement) return res.status(404).json({ error: 'Achievement not found' });
    res.json(achievement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete achievement
router.delete('/:id', async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);
    if (!achievement) return res.status(404).json({ error: 'Achievement not found' });
    res.json({ message: 'Achievement deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
