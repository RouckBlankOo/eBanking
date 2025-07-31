const express = require('express');
const router = express.Router();
const addressCtrl = require('../controllers/addressCtrl');

/**
 * @swagger
 * tags:
 *   name: Address
 *   description: User address management
 */

router.post('/', addressCtrl.createAddress);
router.get('/user/:userId', addressCtrl.getUserAddress);
router.get('/:id', addressCtrl.getAddress);
router.put('/:id', addressCtrl.updateAddress);
router.delete('/:id', addressCtrl.deleteAddress);

module.exports = router;