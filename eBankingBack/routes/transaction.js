const express = require('express');
const router = express.Router();
const transactionCtrl = require('../controllers/transactionCtrl');

/**
 * @swagger
 * tags:
 *   name: Transaction
 *   description: Financial transaction management
 */

router.post('/', transactionCtrl.createTransaction);
router.get('/user/:userId', transactionCtrl.getUserTransactions);
router.get('/:id', transactionCtrl.getTransaction);
router.put('/:id', transactionCtrl.updateTransaction);
router.delete('/:id', transactionCtrl.deleteTransaction);

module.exports = router;