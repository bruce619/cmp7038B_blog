// Authentication controller handles both registration and login process.
const {transporter, mailObject} = require('../config/email_config');
const setupDB = require('../db/db-setup');
const { User, UserTemp } = require('../models/user');
const { getRandomAlphanumericString, hashPassword, comparePasswords, generateOTP, otpTimestamp, getCurrentTimestamp } = require('../utility/utils');
const { registrationSchema, tokenSchema, loginSchema, forgotPasswordSchema, passwordResetSchema } = require('../utility/validations');

setupDB();

// GET: registration view
exports.registerationView = async (req, res) => {
    console.log('========GET REQUEST=========')
    console.log(req.csrfToken())
    res.status(200).render('register', {error: "", success: "", info: ""})
    return
}

// POST: registration
exports.processRegistration = async (req, res) => {

    console.log('========POST REQUEST=========')
    console.log(req.body._csrf)
    delete req.body._csrf

    // validate req.body data using the joi validation defined in the model

    const {error, value } = registrationSchema.validate(req.body)

    // check if error exists in user input
    if (error){
        res.status(400).render('register', {error: error.details[0].message})
        return
    }

    // check if user exists
    const userExist = await UserTemp.query().where('email', value.email).first();
    if (userExist){
        res.status(401).render('register', {error: "User already exists"})
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
              res.status(201).redirect('/login')
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
        res.status(400).render('login', {error: error.details[0].message})
        return
    }

    // check if user exists
    const userExist = await User.query().where('email', verificationTokenExists.email).first();

    if (userExist){
        userExist.$query().patch({is_verified: true})
        .then((user)=>{
            console.log(`Successfully verified user ${user}`)
            res.status(401).render('login', {success: "Your Account has been verified"})
            return
        })
    } else {

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
                req.session.userId = newUser.id
                req.flash('success', `${newUser.first_name}, You have successfully verified your email!`)
                res.status(201).redirect('/')
                return
            })
            .catch((err)=>{
            console.error(err)
        })
        } else {
            res.status(401).render('login', {error: "Invalid verification link token"})
        }


    } 



}

// GET: login view
exports.loginView = async (req, res) => {
    console.log('========GET REQUEST=========')
    console.log(req.csrfToken())
    res.status(200).render('login', {error: "", success: "", info: ""})
    return
}

// POST: login view
exports.processLogin = async (req, res) => {

    console.log('========processLogin POST REQUEST=========')
    console.log(req.body._csrf)
    delete req.body._csrf

    // validate login form data
    const {error, value} = loginSchema.validate(req.body)

    if (error){
        res.status(400).render('login', {error: error.details[0].message})
        return
    }

    // first check if the user exists
    const user = await User.query().where('email', value.email).first();
    // if user doesn't exists return invalid or email
    if (!user){
        res.status(404).render('login', {error: "Invalid Email or Password"})
        return
    }

    // compare user input passwword and hashed user password that was saved in the db
    const passwordExists = await comparePasswords(value.password, user.password);

    // if it doesn't match return invalid email or password message
    if (!passwordExists){
        res.status(404).render('login', {error: "Invalid Email or Password"})
        return
    }

    if (user.is_verified === false){
        res.status(401).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Log In</title>
            <!-- Fontawesome CDN  -->
            <script src="https://kit.fontawesome.com/62765ee528.js" crossorigin="anonymous"></script>
            <!-- css -->
            <link rel="stylesheet" href="/css/styles.css" />
            <!-- js -->
            <script src="/js/login.js" defer></script>
        </head>
        <body>
            <header>
            <div class="container">
                <nav class="navbar">
                <div class="navbar__brand">
                    <a href="/"><img src="/img/company-logo.png" alt="logo" /></a>
                </div>
                <div class="navbar__links">
                    <ul>
                    <li class="nav-link"><a href="/">Home</a></li>
                    <li class="nav-link"><a href="/login">Login</a></li>
                    <li class="nav-link"><a href="/register">Sign Up</a></li>
                    </ul>
                </div>
                </nav>
            </div>
            </header>
            <main>
                <div class="container">
                    <div class="signup-container">

                    <div id="info-msg">
                        <i class="fa fa-info-circle"></i>
                        You need to verify you account. 
                        Check the verification link in your email or
                    </div>
                    
                    <button onclick="location.href='/send-verification'" type="button">Resend verification link</button>
                    </div>
                </div>
            </main>

            <footer class="footer">
            <div class="container">
                <div class="footer__top-content">
                <span>
                    <a href="#">
                    <i class="fa-brands fa-facebook-f"></i>
                    </a>
                </span>
                <span>
                    <a href="#">
                    <i class="fa-brands fa-twitter"></i>
                    </a>
                </span>
                <span>
                    <a href="#">
                    <i class="fa-brands fa-instagram"></i>
                    </a>
                </span>
                </div>
                <div class="footer__bottom-content">
                <p>@2023 C.H.O Blog</p>
                </div>
            </div>
            </footer>
        </body>
        </html>
        `)
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
              console.log("OTP sent to email successfully");
              req.flash('info', `Check your email for your OTP token`)
              res.status(200).redirect(`/auth/otp/${user.id}`)
            }
          });


        })
        .catch((err)=>{
          console.error(err)
      })

        
    } else {
        req.session.userId = user.id
        res.status(200).redirect("/")
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
        res.status(200).redirect('/login')
    });
}

// forget password page 
exports.forgotPasswordView = async (req, res) => {
    console.log('========GET REQUEST=========')
    console.log(req.csrfToken())
    res.status(200).render('forgot_password', {error: "", success: "", info: ""})
    return
}

// handles post request to send the password retrieval link
exports.processForgotPassword = async (req, res) => {

    const _csrf = req.body._csrf
    console.log(_csrf)
    delete req.body._csrf

    const {error, value} = forgotPasswordSchema.validate(req.body);

    if (error){
        res.status(400).render('forgot_password', {error: error.details[0].message})
        return
    }

    // check if email exists
    const emailExists = await User.query().where("email", value.email).first();
    

    if (!emailExists){
        res.status(404).render('forgot_password', {error: 'No user with this email exists'})
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
              console.log("Email sent successfully");
              req.flash('success', 'Email sent successfully')
              res.status(200).render("login", {success: 'Password Reset Successful', csrfToken: req.csrfToken()})
            }
          });

    })
    .catch((err)=>{
        console.error(err)
    })
}


// verification link page 'GET'
exports.verificationLinkView = async (req, res) => {
    console.log('========GET REQUEST=========')
    console.log(req.csrfToken())
    res.status(200).render('verification', {error: "", success: "", info: ""})
    return
}

// verification link 'POST'
exports.processVerificationLink = async (req, res) =>{

    const _csrf = req.body._csrf
    console.log(_csrf)
    delete req.body._csrf

    const {error, value} = forgotPasswordSchema.validate(req.body);

    if (error){
        res.status(400).render('login', {error: error.details[0].message})
        return
    }

    // check if email exists
    const emailExists = await UserTemp.query().where("email", value.email).first();
    if (!emailExists){
        res.status(404).render('login', {error: 'No user with this email exists'})
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
            console.log("Email sent successfully");
            // res.status(201).redirect('/login')
            res.status(201).render('login', {
                success: 'Sucessful! A verification link has been sent to your email.',
                info: 'Complete Your registration by verifying your email.',
                csrfToken: req.csrfToken()
            })
        }
        });
}

exports.createNewPasswordView = async (req, res) => {
    console.log('========GET REQUEST=========')
    console.log(req.csrfToken())
    const {error, value} = tokenSchema.validate(req.params)

    if (error){
        res.status(400).render('forgot_password', {error: error.details[0].message})
        return
    }

    User.query().findOne({reset_password_token: value.token})
    .where('reset_password_expiry_time', '>', getCurrentTimestamp())
    .then(user => {
        if (!user){
            res.status(401).render('forgot-password', {error: 'Token has expired or is Invalid'})
            return
        }
        res.status(200).render("create_password", {reset_token: value.token, success: "", error: "", info: ""})
    })
    .catch((err)=>{
        console.error(err)
    })

}

exports.processCreateNewPassword = async (req, res) => {

    console.log('========POST REQUEST=========')
    console.log(req.body._csrf)
    delete req.body._csrf

    const new_req_obj = {...req.body, ...req.params}

    const {error, value} = passwordResetSchema.validate(new_req_obj)

    if (error){
        res.status(400).render('forgot_password', {error: error.details[0].message})
        return
    }

    // delete confirm_password
    delete value.confirm_password

    value.password = hashPassword(value.password)

    User.query().findOne({reset_password_token: value.token})
    .where('reset_password_expiry_time', '>', getCurrentTimestamp())
    .then(user => {
        if (!user){
            res.status(401).render('forgot-password', {error: 'Token has expired or is Invalid'})
            return
        }
        
        user.$query().patch({password: value.password})
        .then(()=>{
            res.status(200).render("login", {success: 'Password Reset Successful', csrfToken: req.csrfToken()})
        })
        .catch((err)=>{
            console.error(err)
        })

    })
    .catch((err)=>{
        console.error(err)
    })

    
}