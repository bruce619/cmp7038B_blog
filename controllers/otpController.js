// User controller handles users information and profile
const setupDB = require('../db/db-setup');
const { User } = require('../models/user');
const { getCurrentTimestamp } = require('../utility/utils');
const { otpSchema, uuidSchema } = require('../utility/validations');

setupDB();

otpSchema

exports.otpView = async (req, res) => {

    const {error, value } = uuidSchema.validate(req.params)

    console.log(value)

    if (error){
        res.render('home', {error: error.details[0].message})
        return
    }

    const userExists = await User.query().findById(value.id)

    if (!userExists){ // start if
  
        // redirect to login cause user doesn't exists
        req.flash('error', `No such user`)
        res.redirect('/login')
        return
    }else{
        res.render("otp", {user: userExists.id});
    }

    
}


exports.processOTP = async (req, res) => {

    const new_req_obj = {...req.body, ...req.params}

    console.log(new_req_obj)

    const {error, value} = otpSchema.validate(new_req_obj)
       
    if (error){
        res.render('login', {error: error.details[0].message})
        return
    }

    // check if the user exists in the db
  const userExists = await User.query().findById(value.id)

  if (!userExists){ // start if

      // redirect to login cause user doesn't exists
      req.flash('error', `No such user`)
      res.redirect('/login')
      return

  } // end if

  // check if the timestamp has expired
  current_timestamp = getCurrentTimestamp()

  if (current_timestamp > userExists.timestampe){
    // otp has expired
      req.flash('error', `OTP has expired. Try again`)
      res.redirect('/login')
      return
  } else if (userExists.is_used) {
        // otp has been used
        req.flash('error', `OTP has been used. Try again`)
        res.redirect('/login')
  }else{
    userExists.is_used = true;
    req.session.userId = userExists.id
    res.redirect("/")
  }

}