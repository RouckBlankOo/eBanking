const express = require('express');
const router = express.Router();
const achievementCtrl = require('../controllers/achievementCtrl');

/**
 * @swagger
 * tags:
 *   name: Achievement
 *   description: User achievement management
 */

router.post('/', achievementCtrl.createAchievement);
router.get('/user/:userId', achievementCtrl.getUserAchievements);
router.get('/:id', achievementCtrl.getAchievement);
router.put('/:id', achievementCtrl.updateAchievement);
router.delete('/:id', achievementCtrl.deleteAchievement);

module.exports = router;