const mongoose = require('mongoose');

const BankTransferSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bank_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Bank', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  recipient_name: { type: String, required: true },
  recipient_account_number: { type: String, required: true },
  status: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BankTransfer', BankTransferSchema);