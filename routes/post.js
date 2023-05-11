const express = require('express');
const { loginRequired } = require('../utility/utils');
const postController = require('../controllers/postController');
const router = express.Router();

router.get('/post-detail/:id', loginRequired, postController.PostDetailView);
router.get('/post', loginRequired, postController.postView);
router.post('/post', loginRequired, postController.createPost);
router.get('/post/:id/update', loginRequired, postController.updatePostView);
router.post('/post/:id/update', loginRequired, postController.updatePost);
router.get('/post/:id/delete', loginRequired, postController.deletePost);

module.exports = router;