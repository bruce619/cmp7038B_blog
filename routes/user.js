// This is responsible for users routing and endpoint
const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')


router.get('/users', userController.getUsers);


module.exports = router;