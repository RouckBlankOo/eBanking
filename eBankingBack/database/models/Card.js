const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  card_type: { type: String, required: true },
  card_number: { type: String, required: true }, // encrypted
  expiry_date: { type: Date, required: true },
  cvv: { type: String, required: true }, // encrypted
  balance: { type: Number, default: 0.00 },
  is_frozen: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Card', CardSchema);