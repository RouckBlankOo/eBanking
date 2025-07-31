const express = require('express');
const router = express.Router();
const cryptoTransactionCtrl = require('../controllers/cryptoTransactionCtrl');

/**
 * @swagger
 * tags:
 *   name: CryptoTransaction
 *   description: Cryptocurrency transaction management
 */

router.post('/', cryptoTransactionCtrl.createTransaction);
router.get('/wallet/:walletId', cryptoTransactionCtrl.getWalletTransactions);
router.get('/:id', cryptoTransactionCtrl.getTransaction);
router.put('/:id', cryptoTransactionCtrl.updateTransaction);
router.delete('/:id', cryptoTransactionCtrl.deleteTransaction);

module.exports = router;