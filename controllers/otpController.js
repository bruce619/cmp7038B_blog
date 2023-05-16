// User controller handles users information and profile
const setupDB = require('../db/db-setup');
const { User } = require('../models/user');
const { getCurrentTimestamp } = require('../utility/utils');
const { otpSchema, uuidSchema } = require('../utility/validations');

setupDB();

exports.otpView = async (req, res) => {

    console.log('======== otpView GET REQUEST=========')

    const {error, value } = uuidSchema.validate(req.params)

    if (error){
        res.render('home', {error: error.details[0].message})
        return
    }

    const userExists = await User.query().findById(value.id)

    if (!userExists){ // start if

        // redirect to login cause user doesn't exists
        res.render('login', {error: 'Error occured when processing this. Try again', csrfToken: req.csrfToken()})
        return
    }else{
        res.render("otp", {user: userExists.id, csrfToken: req.csrfToken()});
    }

    
}


exports.processOTP = async (req, res) => {

    console.log('========processOTP POST REQUEST=========')
    console.log(req.body._csrf)
    delete req.body._csrf

    const new_req_obj = {...req.body, ...req.params}

    const {error, value} = otpSchema.validate(new_req_obj)
       
    if (error){
        res.render('login', {error: error.details[0].message, csrfToken: req.csrfToken()})
        return
    }

    // check if the user exists in the db
  const userExists = await User.query().findById(value.id).first();

  if (!userExists){ // start if

      // redirect to login cause user doesn't exists
      res.render('login', {error: 'No such user exists', csrfToken: req.csrfToken()})
      return

  } // end if

  const otpExists = await User.query().where("otp", value.otp).first()

  if (!otpExists){ // start if

    // redirect to login cause user doesn't exists
    // otp has expired
    res.render('login', {error: 'Invalid OTP', csrfToken: req.csrfToken()})
    return

} // end if

  // check if the timestamp has expired
  current_timestamp = getCurrentTimestamp()

  if (current_timestamp > userExists.expiration_time){
    console.log("expired")
    // otp has expired
    res.render('login', {error: 'OTP has expired', csrfToken: req.csrfToken()})
    return

  }else{
    req.session.userId = userExists.id
    req.flash('success', `Login Successful`)
    res.redirect("/")  }

}