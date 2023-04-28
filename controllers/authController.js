// Authentication controller handles both registration and login process.
const setupDB = require('../db/db-setup');
const User = require('../models/user');

setupDB();

// GET: registration view
exports.registerationView = async (req, res) => {
    res.render("register");
}

// verify a user's email
exports.verifyEmail = async (req, res) => {
    res.json(res.body)
}

// POST: registration
exports.processRegistration = async (req, res) => {
    res.json(req.body)
}

// GET: login view
exports.loginView = async (req, res) => {
    res.render("login");
}

// POST: login view
exports.processLogin = async (req, res) => {
    res.json(req.body)
}

// GET: logout
exports.logout = async (req, res) => {
    // destroy session
    req.session.destroy(function (err) {
        if (err){
            return console.log(`Error ${err}`);
        }
        // redirect to login
        res.redirect('/login')
    });
}

