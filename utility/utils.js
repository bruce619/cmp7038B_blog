const bcrypt = require ('bcrypt'); // require bcrypt

// function to salt and hash password using bcrypt library
function hashPassword (password) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

function comparePassword (password, passWord) {
  return bcrypt.compare(password, passWord);
}

// function to generate alphanumeric string
function getRandomAlphanumericString(length) {
    let str = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const stringLength = characters.length;
    
    for (let i = 0; i < length; i++) {
      str += characters.charAt(Math.floor(Math.random() * stringLength));
    }
    
    // return random alphanumeric string
    return str;
  }


function loginRequired (res, req, next) {
    if (req.session && req.session.userId) {
        // User is authenticated, proceed with the next
        return next();
    } else {
        // User is not authenticated
        // redirect to the login page
        res.redirect('login');
    }
}
  

module.exports = {
    hashPassword,
    comparePassword,
    getRandomAlphanumericString,
    loginRequired
}