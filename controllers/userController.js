// User controller handles users information and profile
const setupDB = require('../db/db-setup');
const { User } = require('../models/user');
const { uuidSchema, profileSchema } = require('../utility/validations');

setupDB();

exports.profileView = async (req, res) => {

  const {error, value } = uuidSchema.validate(req.params)

  if (error){
      res.render('home', {error: error.details[0].message})
      return
  }

  User.query()
  .findById(value.id)
  .then((user)=>{
    
    const current_user = req.session.userId;

    if (current_user !== value.id){
      req.flash('error', `Permission Denied. You are not the user`)
      res.redirect("/")
      return
  }

    res.render('profile', {user: user, current_user: current_user});
  })
  .catch((err)=>{
    console.error(err)
  })

}


exports.updateProfile = async (req, res) => {
  if (!('two_fa_enabled' in req.body)){
    req.body.two_fa_enabled = false;
  }else{
    req.body.two_fa_enabled = Boolean(req.body.two_fa_enabled)
  }
  if (req.file === undefined){
    req.file = {}
  }

  if ('filename' in req.file){

    const profile_picture = '/' + 'uploads' + '/' + req.file.filename
    
    req.body.profile_picture = profile_picture

  }

  const new_req_obj = {...req.body, ...req.params}

  const {error, value} = profileSchema.validate(new_req_obj)

  if (error){
      res.render('login', {error: error.details[0].message})
      return
  }

  const user = req.session.userId

  // validate if the logged in user is the same as the one doing the update, if not log the account account.
  if (value.id !== user){

    // destroy session
    req.session.destroy(function (err) {
      if (err){
          return console.log(`Error ${err}`);
      }
      // redirect to login
      req.flash('error', `Permission Denied`)
      res.redirect('/login')
      return
  });

  }

  // check if the user exists in the db
  const userExists = await User.query().findById(value.id)

  if (!userExists){ // start if

    // destroy session
    req.session.destroy(function (err) {
      if (err){
          return console.log(`Error ${err}`);
      }
      // redirect to login
      req.flash('error', `No such user`)
      res.redirect('/login')
      return
  });
  
  } // end if

  // remove the id from the object
  delete value.id

  userExists.$query()
  .update(value)
  .then(()=>{
    req.flash('success', `Updated Account Successfully`)
    res.redirect(`/profile/${user}`)
  })
  .catch((err)=>{
    console.error(err)
})

}
