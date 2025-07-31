const express = require('express');
const router = express.Router();
const referralCtrl = require('../controllers/referralCtrl');

/**
 * @swagger
 * tags:
 *   name: Referral
 *   description: Referral management
 */

router.post('/', referralCtrl.createReferral);
router.get('/referrer/:userId', referralCtrl.getReferrerReferrals);
router.get('/referred/:userId', referralCtrl.getReferredReferral);
router.get('/:id', referralCtrl.getReferral);
router.put('/:id', referralCtrl.updateReferral);
router.delete('/:id', referralCtrl.deleteReferral);

module.exports = router;