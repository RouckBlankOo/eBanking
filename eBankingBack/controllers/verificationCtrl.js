const OTP = require('../models/OTP');
const User = require('../models/User');

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}


function sendEmailOtp(req, res) {
  (async () => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      const otp = generateOtp();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry
      await OTP.create({ userId: user._id, otp, expiresAt });
      // TODO: Send OTP to user's email
      res.json({ success: true, message: 'OTP sent to email' });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  })();
}

function verifyEmailOtp(req, res) {
  (async () => {
    try {
      const { email, otp } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      const otpDoc = await OTP.findOne({ userId: user._id, otp });
      if (!otpDoc || otpDoc.expiresAt < new Date()) {
        return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
      }
      await OTP.deleteOne({ _id: otpDoc._id });
      res.json({ success: true, message: 'OTP verified' });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  })();
}

function sendPhoneOtp(req, res) {
  (async () => {
    try {
      const { phone } = req.body;
      const user = await User.findOne({ phone });
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      const otp = generateOtp();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
      await OTP.create({ userId: user._id, otp, expiresAt });
      // TODO: Send OTP to user's phone
      res.json({ success: true, message: 'OTP sent to phone' });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  })();
}

function verifyPhoneOtp(req, res) {
  (async () => {
    try {
      const { phone, otp } = req.body;
      const user = await User.findOne({ phone });
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      const otpDoc = await OTP.findOne({ userId: user._id, otp });
      if (!otpDoc || otpDoc.expiresAt < new Date()) {
        return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
      }
      await OTP.deleteOne({ _id: otpDoc._id });
      res.json({ success: true, message: 'OTP verified' });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  })();
}

module.exports = {
  sendEmailOtp,
  verifyEmailOtp,
  sendPhoneOtp,
  verifyPhoneOtp
};
