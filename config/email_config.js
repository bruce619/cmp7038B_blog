require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  });


function mailObject(to_email, subject, message){
    return {
        from: '"CMP7038B" <tipstar3@gmail.com>', // sender email address
        to: to_email, // receiver email address
        subject: subject,
        text: message,
    }
}



module.exports = {
    transporter,
    mailObject
}