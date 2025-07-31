const express = require('express');
const router = express.Router();
const bankTransferCtrl = require('../controllers/bankTransferCtrl');

/**
 * @swagger
 * tags:
 *   name: BankTransfer
 *   description: Bank transfer management
 */

router.post('/', bankTransferCtrl.createBankTransfer);
router.get('/user/:userId', bankTransferCtrl.getUserTransfers);
router.get('/:id', bankTransferCtrl.getBankTransfer);
router.put('/:id', bankTransferCtrl.updateBankTransfer);
router.delete('/:id', bankTransferCtrl.deleteBankTransfer);

module.exports = router;