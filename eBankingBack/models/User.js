const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Basic Information
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Full name cannot exceed 100 characters']
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
    select: false // Don't include password in queries by default
  },
  
  // Verification Status
  emailVerified: {
    type: Boolean,
    default: false
  },
  phoneVerified: {
    type: Boolean,
    default: false
  },
  
  // Profile Completion Status
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
  
  // Personal Information
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
  
  // Address Information
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
  
  // Identity Verification
  identityVerification: {
    documentType: {
      type: String,
      enum: ['passport', 'driver_license', 'national_id']
    },
    documentNumber: String,
    documentImages: [{
      type: String, // URLs to uploaded images
    }],
    verificationStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    verifiedAt: Date,
    rejectionReason: String
  },
  
  // Security
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: Date,
  refreshTokens: [String],
  
  // Account Status
  isActive: {
    type: Boolean,
    default: true
  },
  isSuspended: {
    type: Boolean,
    default: false
  },
  suspensionReason: String,
  
  // Banking Information
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
  
  // Metadata
  lastLogin: Date,
  ipAddress: String,
  userAgent: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for checking if account is locked
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Virtual for profile completion percentage
userSchema.virtual('profileCompletionPercentage').get(function() {
  const status = this.profileCompletionStatus;
  const completed = Object.values(status).filter(Boolean).length;
  return Math.round((completed / Object.keys(status).length) * 100);
});

// Index for better performance
userSchema.index({ email: 1 });
userSchema.index({ phoneNumber: 1 });
userSchema.index({ createdAt: -1 });

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Hash password with cost of 12
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to increment login attempts
userSchema.methods.incLoginAttempts = function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  
  // Lock account after 5 failed attempts for 2 hours
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // 2 hours
  }
  
  return this.updateOne(updates);
};

// Method to reset login attempts
userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 }
  });
};

// Method to update profile completion status
userSchema.methods.updateProfileCompletion = function(step, completed = true) {
  this.profileCompletionStatus[step] = completed;
  return this.save();
};

module.exports = mongoose.model('User', userSchema);
