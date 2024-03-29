const bcrypt = require ('bcrypt'); // require bcrypt
//https://heynode.com/blog/2020-04/salt-and-hash-passwords-bcrypt/
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

function generateOTP(){
  return Math.random().toString().substr(2, 6)
}

function getCurrentTimestamp(){
  current_date_time = new Date();
  return current_date_time
}

function otpTimestamp() {

  // Add 15 min to current date-time
  const expiry_date_time = new Date(getCurrentTimestamp().getTime() + 15 * 60000);
  // convert to timestamp
  return expiry_date_time;

}
  

module.exports = {
    hashPassword,
    comparePasswords,
    getRandomAlphanumericString,
    generateOTP,
    getCurrentTimestamp,
    otpTimestamp,   
}