// cryptoWallet.js
const express = require('express');
const router = express.Router();
const CryptoWallet = require('../models/CryptoWallet');
const { body, validationResult } = require('express-validator');

/**
 * @swagger
 * tags:
 *   name: CryptoWallet
 *   description: Cryptocurrency wallet management
 */

// Create wallet
router.post('/', [
  body('user_id').notEmpty(),
  body('coin_type').notEmpty(),
  body('address').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const wallet = new CryptoWallet(req.body);
    await wallet.save();
    res.status(201).json(wallet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all wallets for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const wallets = await CryptoWallet.find({ user_id: req.params.userId });
    res.json(wallets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single wallet
router.get('/:id', async (req, res) => {
  try {
    const wallet = await CryptoWallet.findById(req.params.id);
    if (!wallet) return res.status(404).json({ error: 'Wallet not found' });
    res.json(wallet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a wallet
router.put('/:id', async (req, res) => {
  try {
    const wallet = await CryptoWallet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!wallet) return res.status(404).json({ error: 'Wallet not found' });
    res.json(wallet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a wallet
router.delete('/:id', async (req, res) => {
  try {
    const wallet = await CryptoWallet.findByIdAndDelete(req.params.id);
    if (!wallet) return res.status(404).json({ error: 'Wallet not found' });
    res.json({ message: 'Wallet deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
