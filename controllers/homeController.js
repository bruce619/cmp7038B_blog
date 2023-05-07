const setupDB = require('../db/db-setup');
const Post = require('../models/post');

setupDB();


exports.homeView = async (req, res) => {

    res.render('home');
}


exports.searchPost = async (req, res) => {
    res.render('home');

}