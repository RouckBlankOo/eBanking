
const BankTransfer = require('../models/BankTransfer');

async function createBankTransfer(req, res) {
  try {
    const transfer = new BankTransfer(req.body);
    await transfer.save();
    res.status(201).json({ success: true, transfer });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function getUserTransfers(req, res) {
  try {
    const transfers = await BankTransfer.find({ userId: req.params.userId });
    res.json({ success: true, transfers });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function getBankTransfer(req, res) {
  try {
    const transfer = await BankTransfer.findById(req.params.id);
    if (!transfer) return res.status(404).json({ success: false, message: 'Bank transfer not found' });
    res.json({ success: true, transfer });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function updateBankTransfer(req, res) {
  try {
    const transfer = await BankTransfer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!transfer) return res.status(404).json({ success: false, message: 'Bank transfer not found' });
    res.json({ success: true, transfer });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function deleteBankTransfer(req, res) {
  try {
    const transfer = await BankTransfer.findByIdAndDelete(req.params.id);
    if (!transfer) return res.status(404).json({ success: false, message: 'Bank transfer not found' });
    res.json({ success: true, message: 'Bank transfer deleted' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

module.exports = {
  createBankTransfer,
  getUserTransfers,
  getBankTransfer,
  updateBankTransfer,
  deleteBankTransfer
};
