const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const { loginRequired } = require('../middleware/middleware');


router.get('/', loginRequired, homeController.homeView)


module.exports = router;
