const setupDB = require('../db/db-setup');
const Post = require('../models/post');

setupDB();

exports.PostDetailView = async (req, res) => {
    res.render('post');
}