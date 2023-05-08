const express = require('express');
const { loginRequired } = require('../utility/utils');
const postController = require('../controllers/postController');
const router = express.Router();

router.get('/post-detail/:id', loginRequired, postController.PostDetailView);

module.exports = router;