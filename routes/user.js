// This is responsible for users routing and endpoint
const {loginRequired } = require('../middleware/middleware');
const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/profile/:id', loginRequired, userController.profileView);
router.post('/profile/:id', loginRequired, userController.updateProfile);


module.exports = router;
