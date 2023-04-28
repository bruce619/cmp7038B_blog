// This is responsible for users routing and endpoint
const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController');
const { loginRequired } = require('../utility/utils');


router.get('/users', userController.getUsers);
router.get('/users/:id', loginRequired, userController.getUser);


module.exports = router;
