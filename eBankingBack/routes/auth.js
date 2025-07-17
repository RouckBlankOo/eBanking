const express = require('express');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const User = require('../models/User');
const Verification = require('../models/Verification');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');
const { generateVerificationCode } = require('../utils/generators');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../utils/email');
const { sendSMS, sendPasswordResetSMS } = require('../utils/sms');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Rate limiting for sensitive endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const verificationLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 3, // 3 verification attempts per window
  message: {
    success: false,
    message: 'Too many verification attempts, please try again later'
  }
});

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', [
  body('fullName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('phoneNumber')
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { fullName, email, phoneNumber, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNumber }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: existingUser.email === email 
          ? 'User with this email already exists' 
          : 'User with this phone number already exists'
      });
    }

    // Create new user
    const user = new User({
      fullName,
      email,
      phoneNumber,
      password
    });

    await user.save();

    // Generate verification codes
    const emailCode = generateVerificationCode();
    const phoneCode = generateVerificationCode();

    // Save verification codes
    await Promise.all([
      new Verification({
        userId: user._id,
        type: 'email',
        code: emailCode,
        contact: email
      }).save(),
      new Verification({
        userId: user._id,
        type: 'phone',
        code: phoneCode,
        contact: phoneNumber
      }).save()
    ]);

    // Send verification codes
    try {
      await Promise.all([
        sendVerificationEmail(email, emailCode, fullName),
        sendSMS(phoneNumber, phoneCode, fullName)
      ]);
    } catch (error) {
      console.error('Error sending verification codes:', error);
      // Continue with registration even if sending fails
    }

    res.status(201).json({
      success: true,
      message: 'User registered successfully. Verification codes sent to email and phone.',
      data: {
        userId: user._id,
        email: user.email,
        phoneNumber: user.phoneNumber,
        fullName: user.fullName
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', authLimiter, [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find user and include password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if account is locked
    if (user.isLocked) {
      return res.status(423).json({
        success: false,
        message: 'Account is temporarily locked due to too many failed login attempts'
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    // Check if account is suspended
    if (user.isSuspended) {
      return res.status(401).json({
        success: false,
        message: 'Account is suspended',
        reason: user.suspensionReason
      });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      // Increment login attempts
      await user.incLoginAttempts();
      
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Reset login attempts on successful login
    if (user.loginAttempts > 0) {
      await user.resetLoginAttempts();
    }

    // Update last login
    user.lastLogin = new Date();
    user.ipAddress = req.ip;
    user.userAgent = req.get('User-Agent');
    await user.save();

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token
    user.refreshTokens.push(refreshToken);
    await user.save();

    // Remove sensitive information
    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.refreshTokens;

    res.json({
      success: true,
      message: 'Login successful',
      token: accessToken,
      refreshToken,
      user: userResponse
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// @route   POST /api/auth/verify-email
// @desc    Verify email with code
// @access  Public
router.post('/verify-email', verificationLimiter, [
  body('userId').isMongoId().withMessage('Valid user ID is required'),
  body('code').isLength({ min: 4, max: 8 }).withMessage('Valid verification code is required')
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

    const { userId, code } = req.body;

    // Find verification record
    const verification = await Verification.findOne({
      userId,
      type: 'email',
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
        message: 'Too many verification attempts'
      });
    }

    // Mark as verified
    verification.verified = true;
    await verification.save();

    // Update user
    const user = await User.findById(userId);
    if (user) {
      user.emailVerified = true;
      await user.save();
    }

    res.json({
      success: true,
      message: 'Email verified successfully'
    });

  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during email verification'
    });
  }
});

// @route   POST /api/auth/verify-phone
// @desc    Verify phone with code
// @access  Public
router.post('/verify-phone', verificationLimiter, [
  body('userId').isMongoId().withMessage('Valid user ID is required'),
  body('code').isLength({ min: 4, max: 8 }).withMessage('Valid verification code is required')
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

    const { userId, code } = req.body;

    // Find verification record
    const verification = await Verification.findOne({
      userId,
      type: 'phone',
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
        message: 'Too many verification attempts'
      });
    }

    // Mark as verified
    verification.verified = true;
    await verification.save();

    // Update user
    const user = await User.findById(userId);
    if (user) {
      user.phoneVerified = true;
      await user.save();
    }

    res.json({
      success: true,
      message: 'Phone number verified successfully'
    });

  } catch (error) {
    console.error('Phone verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during phone verification'
    });
  }
});

// @route   POST /api/auth/resend-verification
// @desc    Resend verification code
// @access  Public
router.post('/resend-verification', verificationLimiter, [
  body('userId').isMongoId().withMessage('Valid user ID is required'),
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

    const { userId, type } = req.body;

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Delete existing verification codes for this type
    await Verification.deleteMany({ userId, type });

    // Generate new code
    const code = generateVerificationCode();

    // Save verification code
    const verification = new Verification({
      userId,
      type,
      code,
      contact: type === 'email' ? user.email : user.phoneNumber
    });
    await verification.save();

    // Send verification code
    if (type === 'email') {
      await sendVerificationEmail(user.email, code, user.fullName);
    } else {
      await sendSMS(user.phoneNumber, code, user.fullName);
    }

    res.json({
      success: true,
      message: `Verification code sent to your ${type}`
    });

  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while resending verification code'
    });
  }
});

// @route   POST /api/auth/forgot-password
// @desc    Request password reset
// @access  Public
router.post('/forgot-password', authLimiter, [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email')
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

    const { email } = req.body;

    // Find user
    const user = await User.findOne({ email });

    // Always return success to prevent email enumeration
    if (!user) {
      return res.json({
        success: true,
        message: 'If an account with this email exists, a password reset code has been sent'
      });
    }

    // Delete existing password reset codes
    await Verification.deleteMany({ userId: user._id, type: 'password_reset' });

    // Generate reset code
    const code = generateVerificationCode();

    // Save verification code
    const verification = new Verification({
      userId: user._id,
      type: 'password_reset',
      code,
      contact: email
    });
    await verification.save();

    // Send reset email
    try {
      await sendPasswordResetEmail(email, code, user.fullName);
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }

    res.json({
      success: true,
      message: 'If an account with this email exists, a password reset code has been sent'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while processing password reset request'
    });
  }
});

// @route   POST /api/auth/reset-password
// @desc    Reset password with verification code
// @access  Public
router.post('/reset-password', authLimiter, [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('code')
    .isLength({ min: 4, max: 8 })
    .withMessage('Valid verification code is required'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
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

    const { email, code, newPassword } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification code'
      });
    }

    // Find verification record
    const verification = await Verification.findOne({
      userId: user._id,
      type: 'password_reset',
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

    // Update password
    user.password = newPassword;
    await user.save();

    // Mark verification as used and delete
    await verification.deleteOne();

    // Clear all refresh tokens for security
    user.refreshTokens = [];
    await user.save();

    res.json({
      success: true,
      message: 'Password reset successfully'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while resetting password'
    });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', auth, async (req, res) => {
  try {
    const { refreshToken } = req.body;

    // Remove refresh token from user's tokens array
    if (refreshToken) {
      const user = await User.findById(req.user._id);
      user.refreshTokens = user.refreshTokens.filter(token => token !== refreshToken);
      await user.save();
    }

    res.json({
      success: true,
      message: 'Logged out successfully'
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during logout'
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = req.user.toObject();
    delete user.password;
    delete user.refreshTokens;

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching user data'
    });
  }
});

// @route   POST /api/auth/set-password
// @desc    Set password for a user (during signup flow)
// @access  Public
router.post('/set-password', [
  body('userId')
    .notEmpty()
    .withMessage('User ID is required'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { userId, password } = req.body;

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update password
    user.password = password;
    await user.save();

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Add refresh token to user's tokens array
    user.refreshTokens.push(refreshToken);
    await user.save();

    res.json({
      success: true,
      message: 'Password set successfully',
      token: accessToken,
      refreshToken: refreshToken,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified,
        profileCompletionStatus: user.profileCompletionStatus
      }
    });

  } catch (error) {
    console.error('Set password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while setting password'
    });
  }
});

module.exports = router;
