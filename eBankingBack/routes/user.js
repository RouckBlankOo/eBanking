const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/user/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = req.user.toObject();
    
    // Remove sensitive information
    delete user.password;
    delete user.refreshTokens;
    delete user.loginAttempts;
    delete user.lockUntil;

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
});

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, [
  body('fullName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters'),
  body('phoneNumber')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number')
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

    const { fullName, phoneNumber } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if phone number is already taken by another user
    if (phoneNumber && phoneNumber !== user.phoneNumber) {
      const existingUser = await User.findOne({ 
        phoneNumber, 
        _id: { $ne: user._id } 
      });
      
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Phone number is already in use'
        });
      }
      
      // If phone number is changed, mark as unverified
      user.phoneVerified = false;
    }

    // Update fields
    if (fullName) user.fullName = fullName;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    await user.save();

    // Return updated user
    const updatedUser = user.toObject();
    delete updatedUser.password;
    delete updatedUser.refreshTokens;

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating profile'
    });
  }
});

// @route   PUT /api/user/personal-info
// @desc    Update personal information
// @access  Private
router.put('/personal-info', auth, [
  body('dateOfBirth').optional().isISO8601().withMessage('Valid date of birth is required'),
  body('nationality').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Nationality must be between 2 and 50 characters'),
  body('occupation').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Occupation must be between 2 and 100 characters'),
  body('employmentStatus').optional().isIn(['employed', 'self-employed', 'unemployed', 'student', 'retired']).withMessage('Invalid employment status'),
  body('monthlyIncome').optional().isNumeric().withMessage('Monthly income must be a number'),
  body('sourceOfIncome').optional().trim().isLength({ min: 2, max: 200 }).withMessage('Source of income must be between 2 and 200 characters')
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

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update personal information
    const personalInfoFields = [
      'dateOfBirth', 'nationality', 'occupation', 
      'employmentStatus', 'monthlyIncome', 'sourceOfIncome'
    ];

    personalInfoFields.forEach(field => {
      if (req.body[field] !== undefined) {
        user.personalInfo[field] = req.body[field];
      }
    });

    // Mark personal information as completed
    user.profileCompletionStatus.personalInformation = true;

    await user.save();

    res.json({
      success: true,
      message: 'Personal information updated successfully',
      data: {
        personalInfo: user.personalInfo,
        profileCompletionStatus: user.profileCompletionStatus
      }
    });

  } catch (error) {
    console.error('Update personal info error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating personal information'
    });
  }
});

// @route   PUT /api/user/address-info
// @desc    Update address information
// @access  Private
router.put('/address-info', auth, [
  body('street').trim().isLength({ min: 5, max: 200 }).withMessage('Street address must be between 5 and 200 characters'),
  body('city').trim().isLength({ min: 2, max: 100 }).withMessage('City must be between 2 and 100 characters'),
  body('state').trim().isLength({ min: 2, max: 100 }).withMessage('State must be between 2 and 100 characters'),
  body('postalCode').trim().isLength({ min: 3, max: 20 }).withMessage('Postal code must be between 3 and 20 characters'),
  body('country').trim().isLength({ min: 2, max: 100 }).withMessage('Country must be between 2 and 100 characters'),
  body('residenceType').isIn(['owned', 'rented', 'family', 'other']).withMessage('Invalid residence type')
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

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update address information
    const addressFields = ['street', 'city', 'state', 'postalCode', 'country', 'residenceType'];
    
    addressFields.forEach(field => {
      if (req.body[field] !== undefined) {
        user.addressInfo[field] = req.body[field];
      }
    });

    // Mark address information as completed
    user.profileCompletionStatus.addressInformation = true;

    await user.save();

    res.json({
      success: true,
      message: 'Address information updated successfully',
      data: {
        addressInfo: user.addressInfo,
        profileCompletionStatus: user.profileCompletionStatus
      }
    });

  } catch (error) {
    console.error('Update address info error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating address information'
    });
  }
});

// @route   PUT /api/user/identity-verification
// @desc    Update identity verification information
// @access  Private
router.put('/identity-verification', auth, [
  body('documentType').isIn(['passport', 'driver_license', 'national_id']).withMessage('Invalid document type'),
  body('documentNumber').trim().isLength({ min: 5, max: 50 }).withMessage('Document number must be between 5 and 50 characters'),
  body('documentImages').isArray({ min: 1, max: 3 }).withMessage('At least one document image is required, maximum 3 allowed')
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

    const { documentType, documentNumber, documentImages } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update identity verification
    user.identityVerification = {
      documentType,
      documentNumber,
      documentImages,
      verificationStatus: 'pending'
    };

    // Mark identity verification as completed (pending review)
    user.profileCompletionStatus.identityVerification = true;

    await user.save();

    res.json({
      success: true,
      message: 'Identity verification information submitted successfully',
      data: {
        identityVerification: user.identityVerification,
        profileCompletionStatus: user.profileCompletionStatus
      }
    });

  } catch (error) {
    console.error('Update identity verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating identity verification'
    });
  }
});

// @route   PUT /api/user/change-password
// @desc    Change user password
// @access  Private
router.put('/change-password', auth, [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
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

    const { currentPassword, newPassword } = req.body;
    
    // Get user with password field
    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Check if new password is different from current
    const isSamePassword = await user.comparePassword(newPassword);
    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: 'New password must be different from current password'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    // Clear all refresh tokens for security
    user.refreshTokens = [];
    await user.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while changing password'
    });
  }
});

// @route   DELETE /api/user/account
// @desc    Delete user account
// @access  Private
router.delete('/account', auth, [
  body('password').notEmpty().withMessage('Password is required to delete account'),
  body('confirmDeletion').equals('DELETE').withMessage('Please confirm deletion by typing DELETE')
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

    const { password } = req.body;
    
    // Get user with password field
    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Password is incorrect'
      });
    }

    // Delete user account
    await User.findByIdAndDelete(req.user._id);

    res.json({
      success: true,
      message: 'Account deleted successfully'
    });

  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting account'
    });
  }
});

module.exports = router;
