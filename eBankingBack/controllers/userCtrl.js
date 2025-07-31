const User = require('../database/models/User');
const sgMail = require('@sendgrid/mail');
const ejs = require('ejs');
const path = require('path');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const userCtrl = {

    // Update Push Notification Preference Controller
    updatePushNotificationPreference: async (req, res) => {
        try {
            const userId = req.user._id;

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            user.notificationPreferences.push = true;
            await user.save();

            res.status(200).json({
                message: "Push Notification Preference Updated Successfully",
                preferences: user.notificationPreferences
            });
        } catch (err) {
            console.error("Update Notification Error:", err);
            res.status(500).json({ message: "Server error", error: err.message });
        }
    },
    // Update Country of Residence Controller
    updateCountryOfResidence: async (req, res) => {
        try {
            const userId = req.user._id;
            const { countryOfResidence } = req.body;

            if (!countryOfResidence) {
                return res.status(400).json({ message: "Country of residence is required" });
            }

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            user.personalInfo.countryOfResidence = countryOfResidence.trim();
            await user.save();

            res.status(200).json({
                message: "Country of Residence Updated Successfully",
                personalInfo: user.personalInfo
            });
        } catch (err) {
            console.error("Update Country Error:", err);
            res.status(500).json({ message: "Server error", error: err.message });
        }
    },
    // Complete Profile Controller
    completeProfile: async (req, res) => {
        try {
            const userId = req.user._id;
            const { username, firstName, lastName, dateOfBirth, email } = req.body;
            const profilePicture = req.file?.filename;

            if (!username || !firstName || !lastName || !dateOfBirth || !email) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.username = username.trim();
            user.email = email.trim().toLowerCase();
            user.personalInfo.firstName = firstName.trim();
            user.personalInfo.lastName = lastName.trim();
            user.personalInfo.dateOfBirth = new Date(dateOfBirth);
            if (profilePicture) {
                user.personalInfo.profilePicture = profilePicture;
            }

            await user.save();

            res.status(200).json({
                message: 'Profile completed successfully',
                user: {
                    username: user.username,
                    email: user.email,
                    personalInfo: user.personalInfo,
                }
            });
        } catch (err) {
            console.error('Complete Profile Error:', err);
            res.status(500).json({ message: 'Server error', error: err.message });
        }
    },
    // Complete Address Controller
    completeAddress: async (req, res) => {
        try {
            const userId = req.user._id;
            const { country, streetAddress, addressLine2, city, postalCode, state } = req.body;

            if (!country || !streetAddress || !city || !postalCode || !state) {
                return res.status(400).json({ message: "All required address fields must be filled" });
            }

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            user.address = {
                country: country.trim(),
                streetAddress: streetAddress.trim(),
                addressLine2: addressLine2?.trim() || '',
                city: city.trim(),
                postalCode: postalCode.trim(),
                state: state.trim(),
            };

            await user.save();

            res.status(200).json({
                message: "Address information updated successfully",
                address: user.address,
            });
        } catch (err) {
            console.error("Complete Address Error:", err);
            res.status(500).json({ message: "Server error", error: err.message });
        }
    },
    // Complete KYC Data Controller
    completeKycData: async (req, res) => {
        try {
            const userId = req.user._id;
            const { documentType, documentNumber, issuingCity, nationality, expiryDate, } = req.body;

            if (!documentType || !documentNumber || !issuingCity || !nationality) {
                return res.status(400).json({ message: 'All required KYC fields must be filled' });
            }

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const documentPhotos = {};

            // Handle uploaded files
            if (documentType === 'passport') {
                if (!req.files?.passport?.[0]) {
                    return res.status(400).json({ message: 'Passport image is required' });
                }
                documentPhotos.passport = req.files.passport[0].filename;
            } else {
                if (!req.files?.front?.[0] || !req.files?.back?.[0]) {
                    return res.status(400).json({ message: 'Front and back images are required for this document type' });
                }
                documentPhotos.front = req.files.front[0].filename;
                documentPhotos.back = req.files.back[0].filename;
            }

            // Save KYC info
            user.kycVerification = {
                documentType,
                documentNumber: documentNumber.trim(),
                issuingCity: issuingCity.trim(),
                nationality: nationality.trim(),
                expiryDate: expiryDate ? new Date(expiryDate) : undefined,
                documentPhotos,
            };

            await user.save();

            res.status(200).json({
                message: 'KYC data submitted successfully',
                kycVerification: user.kycVerification,
            });
        } catch (err) {
            console.error('Complete KYC Error:', err);
            res.status(500).json({ message: 'Server error', error: err.message });
        }
    },
    // Send OTP Email Controller
    sendOTP: async (req, res) => {
        try {
            const { email } = req.body;
            console.log('SENDGRID KEY:', process.env.SENDGRID_API_KEY);


            if (!email) {
                return res.status(404).json({ message: 'Email not found' });
            }

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const otp = generateOTP();

            // Update userMeta with OTP
            user.userMeta.otp = otp;
            user.userMeta.otpCreatedAt = new Date();
            await user.save();

            // Render the EJS email template
            const emailHtml = await ejs.renderFile(path.join(__dirname, '../views/otpEmail.ejs'),
                {
                    otp,
                    username: user.username,
                }
            );

            // Send email with SendGrid
            const msg = {
                to: user.email,
                from: process.env.SENDGRID_FROM_EMAIL,
                subject: 'Your Verification Code',
                html: emailHtml,
            };

            await sgMail.send(msg);

            res.status(200).json({
                message: 'OTP sent successfully',
                userId: user._id,
            });

        } catch (err) {
            console.error('Send OTP Error:', err);
            res.status(500).json({ message: 'Server error. Please try again.' });
        }
    },
    // Verify OTP Email Controller
    verifyOTP: async (req, res) => {
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

            // Check if OTP is expired (e.g., valid for 10 minutes)
            const now = new Date();
            const otpAgeMinutes = (now - otpCreatedAt) / 1000 / 60;
            if (otpAgeMinutes > 10) {
                return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
            }

            if (storedOTP !== otp) {
                return res.status(400).json({ message: 'Invalid OTP code' });
            }

            // Clear OTP after successful verification
            user.userMeta.otp = null;
            user.userMeta.otpCreatedAt = null;
            user.userMeta.isEmailVerified = true;
            await user.save();

            res.status(200).json({
                message: 'OTP verified successfully',
                userId: user._id,
            });
        } catch (err) {
            console.error('Verify OTP Error:', err);
            res.status(500).json({ message: 'Server error. Please try again.' });
        }
    },



};

module.exports = userCtrl;