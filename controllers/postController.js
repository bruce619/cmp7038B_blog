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

    const post = await Post.query().where('id', value.id).withGraphFetched('user').first();

    if (!post){
        res.render('home', {error: "Post no longer exists"})
        return
    }

    res.render('post_detail', {post: post});
}