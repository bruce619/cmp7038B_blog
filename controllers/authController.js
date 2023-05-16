// Authentication controller handles both registration and login process.
const {transporter, mailObject} = require('../config/email_config');
const setupDB = require('../db/db-setup');
const { User, UserTemp } = require('../models/user');
const { getRandomAlphanumericString, hashPassword, comparePasswords, generateOTP, otpTimestamp, getCurrentTimestamp } = require('../utility/utils');
const { registrationSchema, tokenSchema, loginSchema, forgotPasswordSchema, passwordResetSchema } = require('../utility/validations');

setupDB();

// GET: registration view
exports.registerationView = async (req, res) => {
    res.render('register', {csrfToken: req.csrfToken()})
    return
}

// POST: registration
exports.processRegistration = async (req, res) => {

    delete req.body._csrf

    // validate req.body data using the joi validation defined in the model
    const {error, value } = registrationSchema.validate(req.body)

    // check if error exists in user input
    if (error){
        res.render('register', {error: error.details[0].message, csrfToken: req.csrfToken()})
        return
    }

    // check if user already exists
    const userExist = await UserTemp.query().where('email', value.email).first();
    if (userExist){
        res.render('register', {error: "Error occured when creating user.", csrfToken: req.csrfToken()})
        return
    }    

    // hash and salt password
    value.password = hashPassword(value.password)

    // // add verification token to value
    value.token = getRandomAlphanumericString(30)

    // remove 
    delete value.confirm_password;

    UserTemp.query()
    .insert(value)
    .then((newUser)=>{

        // Do something with the newly inserted user
        const verification_link = `${req.protocol}://${req.get('host')}/verify/${newUser.token}`;

        const mailOptions = mailObject(
            newUser.email,
            "Email Verification Link",
            `Here is your email verification link: ${verification_link}`
            )

        transporter.sendMail(mailOptions, function(err, data) {
            if (err) {
              console.log("Error " + err);
            } else {
              req.flash('success', `Sucessful! A verification link has been sent to your email!`)
              req.flash('info', `Complete Your registration by verifying your email!`)
              res.redirect("/login")
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
        res.render('login', {error: error.details[0].message, csrfToken: req.csrfToken()})
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
            is_verified: true
        }

        User.query()
        .insert(user)
        .then((newUser)=>{
            // req.session.userId = newUser.id
            req.flash('success', `You have successfully verified your email!`)
            res.redirect('/login')
            return
        })
        .catch((err)=>{
        console.error(err)
    })

    } else {
        res.render('login', {error: "Invalid verification link token"})
    }

}

// GET: login view Controller
exports.loginView = async (req, res) => {
    res.render('login', {csrfToken: req.csrfToken()})
    return
}

// POST: login view
exports.processLogin = async (req, res) => {

    delete req.body._csrf

    // validate login form data
    const {error, value} = loginSchema.validate(req.body)

    if (error){
        res.render('login', {error: error.details[0].message, csrfToken: req.csrfToken()})
        return
    }

    // first check if the user exists
    const user = await User.query().where('email', value.email).first();
    // if user doesn't exists return invalid or email
    if (!user){
        //check the user temp table
        const user_temp = UserTemp.query().where('email', value.email).first();
        if (user_temp){
            res.render('reverify', {})
            return
        }else{
            res.render('login', {error: "Invalid Email or Password", csrfToken: req.csrfToken()})
            return
        }
    }
    // compare user input passwword and hashed user password that was saved in the db
    const passwordExists = await comparePasswords(value.password, user.password);
    // if it doesn't match return invalid email or password message
    if (!passwordExists){
        res.render('login', {error: "Invalid Email or Password", csrfToken: req.csrfToken()})
        return
    }

    if (user.two_fa_enabled === true){

        const otp = generateOTP()
        const timestamp_ = otpTimestamp()

        const otp_obj = {
            otp: otp,
            expiration_time: timestamp_
        }

        user.$query()
        .update(otp_obj)
        .then(()=>{

          const mailOptions = mailObject(
            user.email,
            "OTP",
            `Here is your OTP: ${otp}`
            )

        transporter.sendMail(mailOptions, function(err, data) {
            if (err) {
              console.log("Error " + err);
            } else {
              req.flash('info', `An OTP has been sent to your email`)
              res.redirect(`/auth/otp/${user.id}`)
            }
          });


        })
        .catch((err)=>{
          console.error(err)
      })

        
    } else {
        req.session.userId = user.id
        res.redirect("/")
    }

    
    
}

// GET: logout
exports.logout = async (req, res) => {
    // destroy session
    req.session.destroy(function (err) {
        if (err){
            return console.log(`Error ${err}`);
        }
        
        // redirect to login and prevent going back to authenticated page
        res.set('cache-control', 'no-cache, no-store, must-revalidate')
        res.set('pragma', 'no-cache')
        res.redirect('/login')
    });
}

// forget password page 
exports.forgotPasswordView = async (req, res) => {
    res.render('forgot_password', {csrfToken: req.csrfToken()})
    return
}

// handles post request to send the password retrieval link
exports.processForgotPassword = async (req, res) => {

    delete req.body._csrf

    const {error, value} = forgotPasswordSchema.validate(req.body);

    if (error){
        res.render('forgot_password', {error: error.details[0].message, csrfToken: req.csrfToken()})
        return
    }

    // check if email exists
    const emailExists = await User.query().where("email", value.email).first();
    

    if (!emailExists){
        res.render('forgot_password', {error: 'Sorry something went wrong. Try again', csrfToken: req.csrfToken()})
        return
    }

    const reset_token = getRandomAlphanumericString(30)
    const reset_token_expiry_time = otpTimestamp()

    emailExists.reset_password_token = reset_token;
    emailExists.reset_password_expiry_time = reset_token_expiry_time;

    emailExists.$query().patch({
        reset_password_token: emailExists.reset_password_token,
        reset_password_expiry_time: emailExists.reset_password_expiry_time
    }).then(()=>{

        const password_reset_link = `${req.protocol}://${req.get('host')}/reset-password/${reset_token}/`;

        const mailOptions = mailObject(
            emailExists.email,
            "Password Reset Link",
            `Click on this link to create your new password: ${password_reset_link}`,
            )

        transporter.sendMail(mailOptions, function(err, data) {
            if (err) {
              console.log("Error " + err);
            } else {
              req.flash("success", "Password reset link has been sent to your email")
              res.redirect("/login")
            }
          });

    })
    .catch((err)=>{
        console.error(err)
    })
}


// verification link page 'GET'
exports.verificationLinkView = async (req, res) => {
    res.render('verification', {error: "", success: "", info: "", csrfToken: req.csrfToken()})
    return
}

// verification link 'POST'
exports.processVerificationLink = async (req, res) =>{

    delete req.body._csrf

    const {error, value} = forgotPasswordSchema.validate(req.body);

    if (error){
        res.render('login', {error: error.details[0].message, csrfToken: req.csrfToken()})
        return
    }

    // check if email exists
    const emailExists = await UserTemp.query().where("email", value.email).first();
    if (!emailExists){
        res.render('login', {error: 'Invalid. Try again', csrfToken: req.csrfToken()})
        return
    }

    // send verification email
    // Do something with the newly inserted user
    const verification_link = `${req.protocol}://${req.get('host')}/verify/${emailExists.token}`;
    const mailOptions = mailObject(
        value.email,
        "Email Verification Link",
        `Here is your email verification link: ${verification_link}`
        )

    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            req.flash("success", "Sucessful! A verification link has been sent to your email.")
            req.flash("info", "Complete Your registration by verifying your email.")
            res.redirect('/login')
        }
        });
}

exports.createNewPasswordView = async (req, res) => {
    const {error, value} = tokenSchema.validate(req.params)

    if (error){
        res.render('forgot_password', {error: error.details[0].message, csrfToken: req.csrfToken()})
        return
    }

    User.query().findOne({reset_password_token: value.token})
    .where('reset_password_expiry_time', '>', getCurrentTimestamp())
    .then(user => {
        if (!user){
            res.render('forgot-password', {error: 'Token has expired or is Invalid', csrfToken: req.csrfToken()})
            return
        }
        res.render("create_password", {reset_token: value.token, csrfToken: req.csrfToken()})
    })
    .catch((err)=>{
        console.error(err)
    })

}

exports.processCreateNewPassword = async (req, res) => {

    delete req.body._csrf

    const new_req_obj = {...req.body, ...req.params}

    const {error, value} = passwordResetSchema.validate(new_req_obj)

    if (error){
        res.render('forgot_password', {error: error.details[0].message, csrfToken: req.csrfToken()})
        return
    }

    // delete confirm_password
    delete value.confirm_password

    value.password = hashPassword(value.password)

    User.query().findOne({reset_password_token: value.token})
    .where('reset_password_expiry_time', '>', getCurrentTimestamp())
    .then(user => {
        if (!user){
            res.render('forgot-password', {error: 'Token has expired or is Invalid', csrfToken: req.csrfToken()})
            return
        }
        
        user.$query().patch({password: value.password})
        .then(()=>{
            req.flash("success", "Password Reset Successful")
            res.redirect("/login")
        })
        .catch((err)=>{
            console.error(err)
        })

    })
    .catch((err)=>{
        console.error(err)
    })

    
}