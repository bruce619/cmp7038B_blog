// User controller handles users information and profile
const setupDB = require('../db/db-setup');
const { User } = require('../models/user');
const { getCurrentTimestamp } = require('../utility/utils');
const { otpSchema, uuidSchema } = require('../utility/validations');

setupDB();

exports.otpView = async (req, res) => {

    const {error, value } = uuidSchema.validate(req.params)

    if (error){
        res.render('home', {error: error.details[0].message})
        return
    }

    const userExists = await User.query().findById(value.id)

    if (!userExists){ // start if
  
        // redirect to login cause user doesn't exists
        res.render('login', {error: 'No such user'})
        return
    }else{
        res.render("otp", {user: userExists.id});
    }

    
}


exports.processOTP = async (req, res) => {

    const new_req_obj = {...req.body, ...req.params}

    const {error, value} = otpSchema.validate(new_req_obj)
       
    if (error){
        res.render('login', {error: error.details[0].message})
        return
    }

    // check if the user exists in the db
  const userExists = await User.query().findById(value.id).first();

  if (!userExists){ // start if

      // redirect to login cause user doesn't exists
      res.render('login', {error: 'No such user exists'})
      return

  } // end if

  const otpExists = await User.query().where("otp", value.otp).first()

  if (!otpExists){ // start if

    // redirect to login cause user doesn't exists
    // otp has expired
    res.render('login', {error: 'Invalid OTP'})
    return

} // end if

  // check if the timestamp has expired
  current_timestamp = getCurrentTimestamp()

  if (current_timestamp > userExists.expiration_time){
    console.log("expired")
    // otp has expired
    res.render('login', {error: 'OTP has expired'})
    return

  }else{
    req.flash('success', `Login Successful`)
    req.session.userId = userExists.id
    res.redirect("/")  }

}