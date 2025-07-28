// cryptoTransaction.js
const express = require('express');
const router = express.Router();
const CryptoTransaction = require('../models/CryptoTransaction');
const { body, validationResult } = require('express-validator');

/**
 * @swagger
 * tags:
 *   name: CryptoTransaction
 *   description: Cryptocurrency transaction management
 */

// Create transaction
router.post('/', [
  body('wallet_id').notEmpty(),
  body('type').notEmpty(),
  body('amount').notEmpty(),
  body('coin_type').notEmpty(),
  body('status').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const transaction = new CryptoTransaction(req.body);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all transactions for a wallet
router.get('/wallet/:walletId', async (req, res) => {
  try {
    const transactions = await CryptoTransaction.find({ wallet_id: req.params.walletId });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single transaction
router.get('/:id', async (req, res) => {
  try {
    const transaction = await CryptoTransaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a transaction
router.put('/:id', async (req, res) => {
  try {
    const transaction = await CryptoTransaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a transaction
router.delete('/:id', async (req, res) => {
  try {
    const transaction = await CryptoTransaction.findByIdAndDelete(req.params.id);
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
