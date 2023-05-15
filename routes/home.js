const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const { loginRequired } = require('../middleware/middleware');


router.get('/', loginRequired, homeController.homeView)
router.get('/privacy', homeController.privacyView)
router.get('/terms-conditions', homeController.termsConditionsView)


module.exports = router;
