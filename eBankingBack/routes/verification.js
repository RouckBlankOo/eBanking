const express = require('express');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const User = require('../models/User');
const Verification = require('../models/Verification');
const { generateVerificationCode } = require('../utils/generators');
const { sendVerificationEmail } = require('../utils/email');
const { sendSMS } = require('../utils/sms');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Rate limiting for verification endpoints
const verificationLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 3, // 3 verification attempts per window
  message: {
    success: false,
    message: 'Too many verification attempts, please try again later'
  }
});

// @route   POST /api/verification/send-verification
// @desc    Send verification code to user
// @access  Public (for initial verification) / Private (for re-verification)
router.post('/send-verification', verificationLimiter, [
  body('userId').optional().isMongoId().withMessage('Valid user ID is required'),
  body('phoneNumber').optional().isMobilePhone().withMessage('Valid phone number is required'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('type').isIn(['email', 'phone']).withMessage('Type must be email or phone')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { userId, phoneNumber, email, type } = req.body;
    let user;

    // Find user by ID or contact information
    if (userId) {
      user = await User.findById(userId);
    } else if (type === 'email' && email) {
      user = await User.findOne({ email });
    } else if (type === 'phone' && phoneNumber) {
      user = await User.findOne({ phoneNumber });
    }

    if (!user) {
      // Don't reveal if user exists or not for security
      return res.json({
        success: true,
        message: 'If the account exists, a verification code has been sent'
      });
    }

    // Delete existing verification codes for this user and type
    await Verification.deleteMany({ userId: user._id, type });

    // Generate new verification code
    const code = generateVerificationCode();

    // Create new verification record
    const verification = new Verification({
      userId: user._id,
      type,
      code,
      contact: type === 'email' ? user.email : user.phoneNumber
    });

    await verification.save();

    // Send verification code
    try {
      if (type === 'email') {
        await sendVerificationEmail(user.email, code, user.fullName);
      } else {
        await sendSMS(user.phoneNumber, code, user.fullName);
      }

      res.json({
        success: true,
        message: `Verification code sent to your ${type}`,
        data: {
          userId: user._id,
          contact: type === 'email' ? user.email : user.phoneNumber,
          expiresIn: 15 // minutes
        }
      });

    } catch (error) {
      console.error(`Error sending ${type} verification:`, error);
      
      // Delete the verification record if sending failed
      await verification.deleteOne();
      
      res.status(500).json({
        success: false,
        message: `Failed to send verification code to ${type}`
      });
    }

  } catch (error) {
    console.error('Send verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while sending verification code'
    });
  }
});

// @route   POST /api/verification/verify-code
// @desc    Verify code for any type
// @access  Public
router.post('/verify-code', verificationLimiter, [
  body('userId').isMongoId().withMessage('Valid user ID is required'),
  body('code').isLength({ min: 4, max: 8 }).withMessage('Valid verification code is required'),
  body('type').isIn(['email', 'phone', 'password_reset']).withMessage('Valid verification type is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { userId, code, type } = req.body;

    // Find verification record
    const verification = await Verification.findOne({
      userId,
      type,
      code,
      verified: false
    });

    if (!verification) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification code'
      });
    }

    // Check if expired
    if (verification.isExpired()) {
      await verification.deleteOne();
      return res.status(400).json({
        success: false,
        message: 'Verification code has expired'
      });
    }

    // Check attempts
    if (verification.attempts >= 5) {
      await verification.deleteOne();
      return res.status(429).json({
        success: false,
        message: 'Too many verification attempts. Please request a new code'
      });
    }

    // Mark as verified
    verification.verified = true;
    await verification.save();

    // Update user verification status
    const user = await User.findById(userId);
    if (user) {
      if (type === 'email') {
        user.emailVerified = true;
      } else if (type === 'phone') {
        user.phoneVerified = true;
      }
      await user.save();
    }

    res.json({
      success: true,
      message: `${type === 'email' ? 'Email' : type === 'phone' ? 'Phone number' : 'Code'} verified successfully`,
      data: {
        verifiedAt: new Date(),
        type
      }
    });

  } catch (error) {
    console.error('Verify code error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during verification'
    });
  }
});

// @route   POST /api/verification/verify-code-attempt
// @desc    Attempt to verify code (increments attempts on failure)
// @access  Public
router.post('/verify-code-attempt', verificationLimiter, [
  body('userId').isMongoId().withMessage('Valid user ID is required'),
  body('code').isLength({ min: 4, max: 8 }).withMessage('Valid verification code is required'),
  body('type').isIn(['email', 'phone', 'password_reset']).withMessage('Valid verification type is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { userId, code, type } = req.body;

    // Find verification record
    const verification = await Verification.findOne({
      userId,
      type,
      verified: false
    });

    if (!verification) {
      return res.status(400).json({
        success: false,
        message: 'No pending verification found. Please request a new code'
      });
    }

    // Check if expired
    if (verification.isExpired()) {
      await verification.deleteOne();
      return res.status(400).json({
        success: false,
        message: 'Verification code has expired'
      });
    }

    // Check attempts limit before incrementing
    if (verification.attempts >= 5) {
      await verification.deleteOne();
      return res.status(429).json({
        success: false,
        message: 'Too many verification attempts. Please request a new code'
      });
    }

    // Check if code matches
    if (verification.code !== code) {
      // Increment attempts
      await verification.incrementAttempts();
      
      const remainingAttempts = 5 - verification.attempts;
      
      return res.status(400).json({
        success: false,
        message: `Invalid verification code. ${remainingAttempts} attempts remaining`,
        data: {
          remainingAttempts,
          attemptsUsed: verification.attempts
        }
      });
    }

    // Code is correct - mark as verified
    verification.verified = true;
    await verification.save();

    // Update user verification status
    const user = await User.findById(userId);
    if (user) {
      if (type === 'email') {
        user.emailVerified = true;
      } else if (type === 'phone') {
        user.phoneVerified = true;
      }
      await user.save();
    }

    res.json({
      success: true,
      message: `${type === 'email' ? 'Email' : type === 'phone' ? 'Phone number' : 'Code'} verified successfully`,
      data: {
        verifiedAt: new Date(),
        type
      }
    });

  } catch (error) {
    console.error('Verify code attempt error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during verification'
    });
  }
});

// @route   GET /api/verification/status/:userId
// @desc    Get verification status for user
// @access  Private
router.get('/status/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if user can access this information
    if (req.user._id.toString() !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get pending verifications
    const pendingVerifications = await Verification.find({
      userId,
      verified: false
    }).select('type contact expiresAt attempts');

    res.json({
      success: true,
      data: {
        emailVerified: user.emailVerified,
        phoneVerified: user.phoneVerified,
        profileCompletionStatus: user.profileCompletionStatus,
        profileCompletionPercentage: user.profileCompletionPercentage,
        pendingVerifications: pendingVerifications.map(v => ({
          type: v.type,
          contact: v.contact,
          expiresAt: v.expiresAt,
          attempts: v.attempts,
          remainingAttempts: 5 - v.attempts
        }))
      }
    });

  } catch (error) {
    console.error('Get verification status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching verification status'
    });
  }
});

// @route   DELETE /api/verification/clear/:userId
// @desc    Clear all pending verifications for user (admin or user themselves)
// @access  Private
router.delete('/clear/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if user can access this information
    if (req.user._id.toString() !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Delete all pending verifications
    const result = await Verification.deleteMany({ userId, verified: false });

    res.json({
      success: true,
      message: 'Pending verifications cleared',
      data: {
        deletedCount: result.deletedCount
      }
    });

  } catch (error) {
    console.error('Clear verifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while clearing verifications'
    });
  }
});

module.exports = router;
