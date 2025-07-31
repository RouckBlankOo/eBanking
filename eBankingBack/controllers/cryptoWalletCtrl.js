
const CryptoWallet = require('../models/CryptoWallet');

async function createWallet(req, res) {
  try {
    const wallet = new CryptoWallet(req.body);
    await wallet.save();
    res.status(201).json({ success: true, wallet });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function getUserWallets(req, res) {
  try {
    const wallets = await CryptoWallet.find({ userId: req.params.userId });
    res.json({ success: true, wallets });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function getWallet(req, res) {
  try {
    const wallet = await CryptoWallet.findById(req.params.id);
    if (!wallet) return res.status(404).json({ success: false, message: 'Wallet not found' });
    res.json({ success: true, wallet });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function updateWallet(req, res) {
  try {
    const wallet = await CryptoWallet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!wallet) return res.status(404).json({ success: false, message: 'Wallet not found' });
    res.json({ success: true, wallet });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function deleteWallet(req, res) {
  try {
    const wallet = await CryptoWallet.findByIdAndDelete(req.params.id);
    if (!wallet) return res.status(404).json({ success: false, message: 'Wallet not found' });
    res.json({ success: true, message: 'Wallet deleted' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

module.exports = {
  createWallet,
  getUserWallets,
  getWallet,
  updateWallet,
  deleteWallet
};
