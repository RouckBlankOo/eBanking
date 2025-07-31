const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/authMiddleware');
const upload = require('../services/multerService');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User profile management
 */

router.post('/update-push-preference', auth, userCtrl.updatePushNotificationPreference);
router.post('/update-cor', auth, userCtrl.updateCountryOfResidence);
router.put('/complete-profile', auth, upload.single('profilePicture'), userCtrl.completeProfile);
router.put('/complete-address', auth, userCtrl.completeAddress);
router.put('/complete-kyc', auth, upload.fields([
  { name: 'passport', maxCount: 1 },
  { name: 'front', maxCount: 1 },
  { name: 'back', maxCount: 1 }
]), userCtrl.completeKycData);
router.post('/sendotp', auth, userCtrl.sendOTP);
router.post('/verify-otp', auth, userCtrl.verifyOTP);

module.exports = router;