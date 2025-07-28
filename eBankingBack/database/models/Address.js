const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postal_code: { type: String, required: true },
  country: { type: String, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true }
});

module.exports = mongoose.model('Address', AddressSchema);