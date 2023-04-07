// This is responsible for authentication routing and endpoint
const express = require('express')
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/register', authController.getRegisterView);
router.post('/register', authController.postRegistrationView);
router.get('/login', authController.getLoginView);
router.post('/login', authController.postLoginView);

module.exports = router;