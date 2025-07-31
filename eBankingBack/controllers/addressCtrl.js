
const Address = require('../models/Address');

async function createAddress(req, res) {
  try {
    const address = new Address(req.body);
    await address.save();
    res.status(201).json({ success: true, address });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function getUserAddress(req, res) {
  try {
    const address = await Address.findOne({ userId: req.params.userId });
    res.json({ success: true, address });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function getAddress(req, res) {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) return res.status(404).json({ success: false, message: 'Address not found' });
    res.json({ success: true, address });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function updateAddress(req, res) {
  try {
    const address = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!address) return res.status(404).json({ success: false, message: 'Address not found' });
    res.json({ success: true, address });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function deleteAddress(req, res) {
  try {
    const address = await Address.findByIdAndDelete(req.params.id);
    if (!address) return res.status(404).json({ success: false, message: 'Address not found' });
    res.json({ success: true, message: 'Address deleted' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

module.exports = {
  createAddress,
  getUserAddress,
  getAddress,
  updateAddress,
  deleteAddress
};
