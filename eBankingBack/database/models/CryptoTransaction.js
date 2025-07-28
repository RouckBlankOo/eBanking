const mongoose = require('mongoose');

const CryptoTransactionSchema = new mongoose.Schema({
  wallet_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CryptoWallet', required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  coin_type: { type: String, required: true },
  status: { type: String, required: true },
  tx_hash: { type: String, unique: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CryptoTransaction', CryptoTransactionSchema);