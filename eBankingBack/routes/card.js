// card.js
const express = require('express');
const router = express.Router();
const Card = require('../models/Card');
const { body, validationResult } = require('express-validator');

// Create a new card
router.post('/', [
  body('user_id').notEmpty(),
  body('card_type').notEmpty(),
  body('card_number').notEmpty(),
  body('expiry_date').notEmpty(),
  body('cvv').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const card = new Card(req.body);
    await card.save();
    res.status(201).json(card);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all cards for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const cards = await Card.find({ user_id: req.params.userId });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single card
router.get('/:id', async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ error: 'Card not found' });
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a card
router.put('/:id', async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!card) return res.status(404).json({ error: 'Card not found' });
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a card
router.delete('/:id', async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);
    if (!card) return res.status(404).json({ error: 'Card not found' });
    res.json({ message: 'Card deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
