// Authentication controller handles both registration and login process.
const setupDB = require('../db/db-setup');

setupDB();

// GET: registration view
exports.getRegisterView = async (req, res) => {
    res.render("register");
}

// POST: registration view
exports.postRegistrationView = async (req, res) => {
    res.json(req.body)
}

// GET: login view
exports.getLoginView = async (req, res) => {
    res.render("login");
}

// POST: login view
exports.postLoginView = async (req, res) => {
    res.json(req.body)
}
