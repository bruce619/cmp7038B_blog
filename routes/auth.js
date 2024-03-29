// This is responsible for authentication routing and endpoint
const express = require('express')
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/register',  authController.registerationView);
router.post('/register', authController.processRegistration);
router.get('/verify/:token', authController.verifyEmail);
router.get('/login', authController.loginView);
router.post('/login', authController.processLogin);
router.get('/logout', authController.logout);
router.get('/forgot-password', authController.forgotPasswordView);
router.post('/forgot-password', authController.processForgotPassword);
router.get('/reset-password/:token', authController.createNewPasswordView);
router.post('/reset-password/:token', authController.processCreateNewPassword);
router.get('/send-verification', authController.verificationLinkView);
router.post('/send-verification', authController.processVerificationLink);
module.exports = router;