// This is responsible for authentication routing and endpoint
const express = require('express')
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/register', authController.getRegisterView);
router.post('/register', authController.postRegistrationView);
router.get('/login', authController.getLoginView);
router.post('/login', authController.postLoginView);

module.exports = router;