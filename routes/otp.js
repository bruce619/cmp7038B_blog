const express = require('express');
const router = express.Router();
const otpController = require('../controllers/otpController');

router.get('/auth/otp/:id', otpController.otpView)
router.post('/auth/otp/:id', otpController.processOTP)


module.exports = router;