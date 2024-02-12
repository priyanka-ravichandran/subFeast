const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/verifyOtp', authController.verifyOtp);
router.post('/generateotp', authController.generateotp);
module.exports = router;