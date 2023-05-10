const setupDB = require('../db/db-setup');
const Post = require('../models/post');
const { uuidSchema } = require('../utility/validations');

setupDB();

exports.PostDetailView = async (req, res) => {

    const {error, value } = uuidSchema.validate(req.params)

    if (error){
        res.render('home', {error: error.details[0].message})
        return
    }

    const post = await Post.query().findById(value.id).withGraphFetched('user').first();

    if (!post){
        res.render('home', {error: "Post no longer exists"})
        return
    }

    const current_user = req.session.userId

    res.render('post_detail', {post: post, current_user: current_user});
}


exports.postView = async (req, res) => {
    res.render('create_post', {})
}

exports.createPost = async (req, res) => {
    res.json()
}

exports.updatePostView = async (req, res) => {
    res.render("update_post", {})
}

exports.updatePost = async (req, res) => {
    res.json()
}