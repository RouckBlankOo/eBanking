const express = require('express');
const router = express.Router();
const cardCtrl = require('../controllers/cardCtrl');

/**
 * @swagger
 * tags:
 *   name: Card
 *   description: User card management
 */

router.post('/', cardCtrl.createCard);
router.get('/user/:userId', cardCtrl.getUserCards);
router.get('/:id', cardCtrl.getCard);
router.put('/:id', cardCtrl.updateCard);
router.delete('/:id', cardCtrl.deleteCard);

module.exports = router;