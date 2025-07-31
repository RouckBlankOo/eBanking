const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: { type: String, unique: true, trim: true },
        phone: { type: String, required: true, unique: true, trim: true },
        email: { type: String, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true, minlength: 6 },

        // Personal Information
        personalInfo: {
            firstName: { type: String, trim: true },
            lastName: { type: String, trim: true },
            dateOfBirth: { type: Date },
            profilePicture: { type: String },
            countryOfResidence: { type: String, trim: true },
        },

        // Address Information
        address: {
            country: { type: String, trim: true },
            streetAddress: { type: String, trim: true },
            addressLine2: { type: String, trim: true },
            city: { type: String, trim: true },
            postalCode: { type: String, trim: true },
            state: { type: String, trim: true },
        },

        // KYC Verification
        kycVerification: {
            documentType: {
                type: String,
                enum: ['passport', 'driving_license', 'national_id_card'],
            },
            documentNumber: { type: String, trim: true },
            issuingCity: { type: String, trim: true },
            nationality: { type: String, trim: true },
            expiryDate: { type: Date },

            // Documents
            documentPhotos: {
                passport: { type: String },
                front: { type: String },
                back: { type: String },
            },
        },

        userMeta: {
            isEmailVerified: { type: Boolean, default: false },
            isPhoneVerified: { type: Boolean, default: false },
            token: { type: String, default: null },
            otp: { type: String, default: null },
            otpCreatedAt: { type: Date, default: null },
        },
        notificationPreferences: {
            sms: { type: Boolean, default: false },
            email: { type: Boolean, default: false },
            push: { type: Boolean, default: false },
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);