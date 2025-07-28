// User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [30, 'Full name cannot exceed 30 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    trim: true,
    match: [/^\+?[\d\s-()]+$/, 'Please enter a valid phone number']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  phoneVerified: {
    type: Boolean,
    default: false
  },
  profileCompletionStatus: {
    personalInformation: {
      type: Boolean,
      default: false
    },
    addressInformation: {
      type: Boolean,
      default: false
    },
    identityVerification: {
      type: Boolean,
      default: false
    }
  },
  personalInfo: {
    dateOfBirth: Date,
    nationality: String,
    occupation: String,
    employmentStatus: {
      type: String,
      enum: ['employed', 'self-employed', 'unemployed', 'student', 'retired']
    },
    monthlyIncome: Number,
    sourceOfIncome: String
  },
  addressInfo: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    residenceType: {
      type: String,
      enum: ['owned', 'rented', 'family', 'other']
    }
  },
  identityVerification: {
    documentType: {
      type: String,
      enum: ['passport', 'driver_license', 'national_id']
    },
    documentNumber: String,
    documentImages: [{
      type: String,
    }],
    verificationStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    verifiedAt: Date,
    rejectionReason: String
  },
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: Date,
  refreshTokens: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  isSuspended: {
    type: Boolean,
    default: false
  },
  suspensionReason: String,
  bankingInfo: {
    accountBalance: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: 'USD'
    },
    accountType: {
      type: String,
      enum: ['basic', 'premium', 'vip'],
      default: 'basic'
    }
  },
  lastLogin: Date,
  ipAddress: String,
  userAgent: String
}, {timestamps: true,});

model.exports = mongoose.model('User', userSchema);