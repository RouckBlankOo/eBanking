// routes/auth.js
const express = require('express');
const router = express.Router();
const authCtrl = require("../controllers/authctrl.js");

router.post('/login', authCtrl.loginUser);
router.post('/register', authCtrl.registerUser);

module.exports = router;