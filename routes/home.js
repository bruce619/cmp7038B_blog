const express = require('express');
const { loginRequired } = require('../utility/utils');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', loginRequired, homeController.homeView)
router.get('/search', homeController.searchPost)



module.exports = router;
