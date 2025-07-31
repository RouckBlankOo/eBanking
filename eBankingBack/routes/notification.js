const express = require('express');
const router = express.Router();
const notificationCtrl = require('../controllers/notificationCtrl');

/**
 * @swagger
 * tags:
 *   name: Notification
 *   description: User notification management
 */

router.post('/', notificationCtrl.createNotification);
router.get('/user/:userId', notificationCtrl.getUserNotifications);
router.get('/:id', notificationCtrl.getNotification);
router.put('/:id', notificationCtrl.updateNotification);
router.delete('/:id', notificationCtrl.deleteNotification);

module.exports = router;