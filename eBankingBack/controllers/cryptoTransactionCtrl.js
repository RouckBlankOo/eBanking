
const CryptoTransaction = require('../models/CryptoTransaction');

async function createTransaction(req, res) {
  try {
    const transaction = new CryptoTransaction(req.body);
    await transaction.save();
    res.status(201).json({ success: true, transaction });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function getWalletTransactions(req, res) {
  try {
    const transactions = await CryptoTransaction.find({ walletId: req.params.walletId });
    res.json({ success: true, transactions });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function getTransaction(req, res) {
  try {
    const transaction = await CryptoTransaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ success: false, message: 'Transaction not found' });
    res.json({ success: true, transaction });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function updateTransaction(req, res) {
  try {
    const transaction = await CryptoTransaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!transaction) return res.status(404).json({ success: false, message: 'Transaction not found' });
    res.json({ success: true, transaction });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function deleteTransaction(req, res) {
  try {
    const transaction = await CryptoTransaction.findByIdAndDelete(req.params.id);
    if (!transaction) return res.status(404).json({ success: false, message: 'Transaction not found' });
    res.json({ success: true, message: 'Transaction deleted' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

module.exports = {
  createTransaction,
  getWalletTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction
};
