// address.js
const express = require('express');
const router = express.Router();
const Address = require('../models/Address');
const { body, validationResult } = require('express-validator');

/**
 * @swagger
 * tags:
 *   name: Address
 *   description: User address management
 */

// Create address
router.post('/', [
  body('street').notEmpty(),
  body('city').notEmpty(),
  body('state').notEmpty(),
  body('postal_code').notEmpty(),
  body('country').notEmpty(),
  body('user_id').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const address = new Address(req.body);
    await address.save();
    res.status(201).json(address);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get address by user
router.get('/user/:userId', async (req, res) => {
  try {
    const address = await Address.findOne({ user_id: req.params.userId });
    res.json(address);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get address by id
router.get('/:id', async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) return res.status(404).json({ error: 'Address not found' });
    res.json(address);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update address
router.put('/:id', async (req, res) => {
  try {
    const address = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!address) return res.status(404).json({ error: 'Address not found' });
    res.json(address);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete address
router.delete('/:id', async (req, res) => {
  try {
    const address = await Address.findByIdAndDelete(req.params.id);
    if (!address) return res.status(404).json({ error: 'Address not found' });
    res.json({ message: 'Address deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
