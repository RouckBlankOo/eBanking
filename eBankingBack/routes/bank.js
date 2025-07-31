const express = require('express');
const router = express.Router();
const bankCtrl = require('../controllers/bankCtrl');

/**
 * @swagger
 * tags:
 *   name: Bank
 *   description: Bank directory management
 */

router.post('/', bankCtrl.createBank);
router.get('/', bankCtrl.getAllBanks);
router.get('/:id', bankCtrl.getBank);
router.put('/:id', bankCtrl.updateBank);
router.delete('/:id', bankCtrl.deleteBank);

module.exports = router;