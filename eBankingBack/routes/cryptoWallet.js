const express = require('express');
const router = express.Router();
const cryptoWalletCtrl = require('../controllers/cryptoWalletCtrl');

/**
 * @swagger
 * tags:
 *   name: CryptoWallet
 *   description: Cryptocurrency wallet management
 */

router.post('/', cryptoWalletCtrl.createWallet);
router.get('/user/:userId', cryptoWalletCtrl.getUserWallets);
router.get('/:id', cryptoWalletCtrl.getWallet);
router.put('/:id', cryptoWalletCtrl.updateWallet);
router.delete('/:id', cryptoWalletCtrl.deleteWallet);

module.exports = router;