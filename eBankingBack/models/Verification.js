const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['email', 'phone', 'password_reset'],
    required: true
  },
  code: {
    type: String,
    required: true
  },
  contact: {
    type: String, // email or phone number
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  attempts: {
    type: Number,
    default: 0,
    max: 5
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
  }
}, {
  timestamps: true
});

// Index for automatic deletion of expired documents
verificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Index for faster queries
verificationSchema.index({ userId: 1, type: 1 });
verificationSchema.index({ code: 1 });

// Method to check if verification is expired
verificationSchema.methods.isExpired = function() {
  return Date.now() > this.expiresAt;
};

// Method to increment attempts
verificationSchema.methods.incrementAttempts = function() {
  this.attempts += 1;
  return this.save();
};

module.exports = mongoose.model('Verification', verificationSchema);
