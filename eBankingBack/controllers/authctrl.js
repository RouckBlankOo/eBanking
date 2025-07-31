// controllers/authCtrl.js
const User = require('../database/models/User');
const sgMail = require('@sendgrid/mail');
const ejs = require('ejs');
const path = require('path');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const authCtrl = {
  sendOtp: async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const otp = generateOTP();
      user.userMeta.otp = otp;
      user.userMeta.otpCreatedAt = new Date();
      await user.save();
      const emailHtml = await ejs.renderFile(path.join(__dirname, '../views/otpEmail.ejs'), {
        otp,
        username: user.username,
      });
      const msg = {
        to: user.email,
        from: process.env.SENDGRID_FROM_EMAIL,
        subject: 'Your Verification Code',
        html: emailHtml,
      };
      await sgMail.send(msg);
      res.status(200).json({ message: 'OTP sent successfully', userId: user._id });
    } catch (err) {
      console.error('Send OTP Error:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },
  verifyOtp: async (req, res) => {
    try {
      const { email, otp } = req.body;
      if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const storedOTP = user.userMeta.otp;
      const otpCreatedAt = user.userMeta.otpCreatedAt;
      if (!storedOTP || !otpCreatedAt) {
        return res.status(400).json({ message: 'No OTP found. Please request a new one.' });
      }
      const now = new Date();
      const otpAgeMinutes = (now - otpCreatedAt) / 1000 / 60;
      if (otpAgeMinutes > 10) {
        return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
      }
      if (storedOTP !== otp) {
        return res.status(400).json({ message: 'Invalid OTP code' });
      }
      user.userMeta.otp = null;
      user.userMeta.otpCreatedAt = null;
      user.userMeta.isEmailVerified = true;
      await user.save();
      res.status(200).json({ message: 'OTP verified successfully', userId: user._id });
    } catch (err) {
      console.error('Verify OTP Error:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },
  loginUser: async (req, res) => {
    // Implement login logic
  },
  registerUser: async (req, res) => {
    // Implement register logic
  },
};

module.exports = authCtrl;