// This is responsible for routing and endpoint
const express = require('express')
const {registerView, loginView } = require('../controllers/authController');

const router = express.Router();

router.get('/register', registerView);
router.get('/login', loginView);

module.exports = router;