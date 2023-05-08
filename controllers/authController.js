// Authentication controller handles both registration and login process.
const {transporter, mailObject} = require('../config/email_config');
const setupDB = require('../db/db-setup');
const { User, UserTemp } = require('../models/user');
const { getRandomAlphanumericString, hashPassword, comparePasswords } = require('../utility/utils');
const { registrationSchema, tokenSchema, loginSchema } = require('../utility/validations');

setupDB();

// GET: registration view
exports.registerationView = async (req, res) => {
    res.render("register", {error: req.flash('error')});
}

// POST: registration
exports.processRegistration = async (req, res) => {

    // validate req.body data using the joi validation defined in the model

    const {error, value } = registrationSchema.validate(req.body)

    // check if error exists in user input
    if (error){
        res.render('register', {error: error.details[0].message})
        return
    }

    // check if user exists
    const userExist = await UserTemp.query().where('email', value.email).first();
    if (userExist){
        res.render('register', {error: "User already exists"})
        return
    }    

    // hash and salt password
    value.password = hashPassword(value.password)

    // // add verification token to value
    value.token = getRandomAlphanumericString(30)

    // remove 
    delete value.confirm_password;

    // // insert user data
    console.log(value)

    UserTemp.query()
    .insert(value)
    .then((newUser)=>{

        // Do something with the newly inserted user
        console.log(newUser);
        const verification_link = `${req.protocol}://${req.get('host')}/verify/${newUser.token}`;
        console.log(verification_link)
        const mailOptions = mailObject(
            newUser.email,
            "Email Verification Link",
            `Here is your email verification link: ${verification_link}`
            )

        transporter.sendMail(mailOptions, function(err, data) {
            if (err) {
              console.log("Error " + err);
            } else {
              console.log("Email sent successfully");
              req.flash('success', 'Sucessful! A verification link has been sent to your email.')
              req.flash('info', 'Complete Your registration by verifying your email.')
              res.redirect('/login')
            }
          });

    })
    .catch((err)=>{
        console.error(err)
    })
        
}

// verify a user's email
exports.verifyEmail = async (req, res) => {

    const {error, value } = tokenSchema.validate(req.params)

    if (error){
        res.render('login', {error: error.details[0].message})
        return
    }

    const verificationTokenExists = await UserTemp.query().where("token", value.token).first()
    if (verificationTokenExists){

        const user = {
            first_name: verificationTokenExists.first_name,
            last_name: verificationTokenExists.last_name,
            email: verificationTokenExists.email,
            username: verificationTokenExists.username,
            password: verificationTokenExists.password,
        }

        User.query()
        .insert(user)
        .then((newUser)=>{
            req.session.userId = newUser.id
            req.flash('success', `${newUser.first_name}, You have successfully verified your email!`)
            res.redirect('/')
            return
        })
        .catch((err)=>{
        console.error(err)
    })
    } else {
        res.render('login', {error: "Invalid verification link token"})
    }

}

// GET: login view
exports.loginView = async (req, res) => {
    res.render("login", {error: ''});
}

// POST: login view
exports.processLogin = async (req, res) => {

    // validate login form data
    const {error, value} = loginSchema.validate(req.body)

    if (error){
        res.render('login', {error: error.details[0].message})
        return
    }

    // first check if the user exists
    const user = await User.query().where('email', value.email).first();
    // if user doesn't exists return invalid or email
    if (!user){
        res.render('login', {error: "Invalid Email or Password"})
        return
    }

    // compare user input passwword and hashed user password that was saved in the db
    const passwordExists = await comparePasswords(value.password, user.password);

    // if it doesn't match return invalid email or password message
    if (!passwordExists){
        res.render('login', {error: "Invalid Email or Password"})
        return
    }

    
    req.session.userId = user.id

    res.redirect("/")
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

