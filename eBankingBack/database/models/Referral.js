const mongoose = require('mongoose');

const ReferralSchema = new mongoose.Schema({
  referrer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  referred_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
  referral_code: { type: String, required: true },
  reward_amount: { type: Number, default: 0.0 },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Referral', ReferralSchema);