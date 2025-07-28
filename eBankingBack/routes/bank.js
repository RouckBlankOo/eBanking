// bank.js
const express = require('express');
const router = express.Router();
const Bank = require('../models/Bank');
const { body, validationResult } = require('express-validator');

/**
 * @swagger
 * tags:
 *   name: Bank
 *   description: Bank directory management
 */

// Create bank
router.post('/', [
  body('name').notEmpty(),
  body('full_name').notEmpty(),
  body('country').notEmpty(),
  body('swift_code').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const bank = new Bank(req.body);
    await bank.save();
    res.status(201).json(bank);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all banks
router.get('/', async (req, res) => {
  try {
    const banks = await Bank.find();
    res.json(banks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single bank
router.get('/:id', async (req, res) => {
  try {
    const bank = await Bank.findById(req.params.id);
    if (!bank) return res.status(404).json({ error: 'Bank not found' });
    res.json(bank);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a bank
router.put('/:id', async (req, res) => {
  try {
    const bank = await Bank.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bank) return res.status(404).json({ error: 'Bank not found' });
    res.json(bank);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a bank
router.delete('/:id', async (req, res) => {
  try {
    const bank = await Bank.findByIdAndDelete(req.params.id);
    if (!bank) return res.status(404).json({ error: 'Bank not found' });
    res.json({ message: 'Bank deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
