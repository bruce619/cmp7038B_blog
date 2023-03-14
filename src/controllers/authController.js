// Authentication controller handles both registration and login process.

// registartion
const registerView = (req, res) => {
    res.render("register", {

    });
}

// registartion
const loginView = (req, res) => {
    res.render("login", {
        
    });
}

module.exports =  {
    registerView,
    loginView
};