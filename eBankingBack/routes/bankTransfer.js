// bankTransfer.js
const express = require('express');
const router = express.Router();
const BankTransfer = require('../models/BankTransfer');
const { body, validationResult } = require('express-validator');

/**
 * @swagger
 * tags:
 *   name: BankTransfer
 *   description: Bank transfer management
 */

// Create bank transfer
router.post('/', [
  body('user_id').notEmpty(),
  body('bank_id').notEmpty(),
  body('amount').notEmpty(),
  body('currency').notEmpty(),
  body('recipient_name').notEmpty(),
  body('recipient_account_number').notEmpty(),
  body('status').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const transfer = new BankTransfer(req.body);
    await transfer.save();
    res.status(201).json(transfer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all transfers for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const transfers = await BankTransfer.find({ user_id: req.params.userId });
    res.json(transfers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single transfer
router.get('/:id', async (req, res) => {
  try {
    const transfer = await BankTransfer.findById(req.params.id);
    if (!transfer) return res.status(404).json({ error: 'Transfer not found' });
    res.json(transfer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a transfer
router.put('/:id', async (req, res) => {
  try {
    const transfer = await BankTransfer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!transfer) return res.status(404).json({ error: 'Transfer not found' });
    res.json(transfer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a transfer
router.delete('/:id', async (req, res) => {
  try {
    const transfer = await BankTransfer.findByIdAndDelete(req.params.id);
    if (!transfer) return res.status(404).json({ error: 'Transfer not found' });
    res.json({ message: 'Transfer deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
