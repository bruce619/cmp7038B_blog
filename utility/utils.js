const bcrypt = require ('bcrypt'); // require bcrypt

// function to salt and hash password using bcrypt library
function hashPassword(password){
    const salt_rounds = 10;
    const salt = bcrypt.genSaltSync(salt_rounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

// function to compare hash password and normal password
function comparePasswords(password, passWord){
  // password: user input password
  // passWord: hashed password
  return bcrypt.compare(password, passWord);
}

// function to generate alphanumeric string
function getRandomAlphanumericString(length){
    let str = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const string_length = characters.length;
    
    for (let i = 0; i < length; i++) {
      str += characters.charAt(Math.floor(Math.random() * string_length));
    }
    
    // return random alphanumeric string
    return str;
  }


function loginRequired(req, res, next){
    if (req.session && req.session.userId) {
        // User is authenticated, proceed with the next
        return next();
    } else {
        // User is not authenticated
        // redirect to the login page
        res.redirect('/login');
    }
}

function generateOTP(){
  return Math.random().toString().substr(2, 6)
}

function getCurrentTimestamp(){
  current_date = new Date();

  const timestamp = current_date

  return timestamp
}

function otpTimestamp() {

  // Add 30 min to current date-time
  const expiry_time = new Date(getCurrentTimestamp() + 30 * 60000);

  // convert to timestamp
  const expiry_timestamp = expiry_time;

  return expiry_timestamp;
}
  

module.exports = {
    hashPassword,
    comparePasswords,
    getRandomAlphanumericString,
    loginRequired,
    generateOTP,
    getCurrentTimestamp,
    otpTimestamp
}