// referral.js
const express = require('express');
const router = express.Router();
const Referral = require('../models/Referral');
const { body, validationResult } = require('express-validator');

/**
 * @swagger
 * tags:
 *   name: Referral
 *   description: Referral management
 */

// Create referral
router.post('/', [
  body('referrer_id').notEmpty(),
  body('referred_id').notEmpty(),
  body('referral_code').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const referral = new Referral(req.body);
    await referral.save();
    res.status(201).json(referral);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all referrals for a user (as referrer)
router.get('/referrer/:userId', async (req, res) => {
  try {
    const referrals = await Referral.find({ referrer_id: req.params.userId });
    res.json(referrals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get referral by referred user
router.get('/referred/:userId', async (req, res) => {
  try {
    const referral = await Referral.findOne({ referred_id: req.params.userId });
    res.json(referral);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single referral
router.get('/:id', async (req, res) => {
  try {
    const referral = await Referral.findById(req.params.id);
    if (!referral) return res.status(404).json({ error: 'Referral not found' });
    res.json(referral);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a referral
router.put('/:id', async (req, res) => {
  try {
    const referral = await Referral.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!referral) return res.status(404).json({ error: 'Referral not found' });
    res.json(referral);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a referral
router.delete('/:id', async (req, res) => {
  try {
    const referral = await Referral.findByIdAndDelete(req.params.id);
    if (!referral) return res.status(404).json({ error: 'Referral not found' });
    res.json({ message: 'Referral deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
