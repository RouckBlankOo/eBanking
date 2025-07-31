
const Bank = require('../models/Bank');

async function createBank(req, res) {
  try {
    const bank = new Bank(req.body);
    await bank.save();
    res.status(201).json({ success: true, bank });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function getAllBanks(req, res) {
  try {
    const banks = await Bank.find();
    res.json({ success: true, banks });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function getBank(req, res) {
  try {
    const bank = await Bank.findById(req.params.id);
    if (!bank) return res.status(404).json({ success: false, message: 'Bank not found' });
    res.json({ success: true, bank });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function updateBank(req, res) {
  try {
    const bank = await Bank.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bank) return res.status(404).json({ success: false, message: 'Bank not found' });
    res.json({ success: true, bank });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function deleteBank(req, res) {
  try {
    const bank = await Bank.findByIdAndDelete(req.params.id);
    if (!bank) return res.status(404).json({ success: false, message: 'Bank not found' });
    res.json({ success: true, message: 'Bank deleted' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

module.exports = {
  createBank,
  getAllBanks,
  getBank,
  updateBank,
  deleteBank
};
