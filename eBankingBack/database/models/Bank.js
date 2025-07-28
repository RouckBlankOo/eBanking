const mongoose = require('mongoose');

const BankSchema = new mongoose.Schema({
  name: { type: String, required: true },
  full_name: { type: String, required: true },
  country: { type: String, required: true },
  swift_code: { type: String, unique: true, required: true },
  logo_url: { type: String }
});

module.exports = mongoose.model('Bank', BankSchema);