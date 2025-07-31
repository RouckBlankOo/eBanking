const Referral = require('../models/Referral');


async function createReferral(req, res) {
  try {
    const referral = new Referral(req.body);
    await referral.save();
    res.status(201).json({ success: true, referral });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function getReferrerReferrals(req, res) {
  try {
    const referrals = await Referral.find({ referrerId: req.params.userId });
    res.json({ success: true, referrals });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function getReferredReferral(req, res) {
  try {
    const referrals = await Referral.find({ referredId: req.params.userId });
    res.json({ success: true, referrals });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function getReferral(req, res) {
  try {
    const referral = await Referral.findById(req.params.id);
    if (!referral) return res.status(404).json({ success: false, message: 'Referral not found' });
    res.json({ success: true, referral });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function updateReferral(req, res) {
  try {
    const referral = await Referral.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!referral) return res.status(404).json({ success: false, message: 'Referral not found' });
    res.json({ success: true, referral });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function deleteReferral(req, res) {
  try {
    const referral = await Referral.findByIdAndDelete(req.params.id);
    if (!referral) return res.status(404).json({ success: false, message: 'Referral not found' });
    res.json({ success: true, message: 'Referral deleted' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

module.exports = {
  createReferral,
  getReferrerReferrals,
  getReferredReferral,
  getReferral,
  updateReferral,
  deleteReferral
};
