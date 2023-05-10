// This is responsible for users routing and endpoint
const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController');
const { loginRequired } = require('../utility/utils');
const { file_upload } = require('../middleware/middleware');

file_upload

router.get('/profile/:id', loginRequired, userController.profileView);
router.post('/profile/:id', loginRequired, file_upload.single('profile_picture'), userController.updateProfile);


module.exports = router;
