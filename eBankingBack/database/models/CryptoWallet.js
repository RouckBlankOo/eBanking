const mongoose = require('mongoose');

const CryptoWalletSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  coin_type: { type: String, required: true },
  balance: { type: Number, default: 0.0 },
  address: { type: String, unique: true, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CryptoWallet', CryptoWalletSchema);