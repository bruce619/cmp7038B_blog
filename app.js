// imports
const express = require('express');
const session = require('express-session');
const config = require('./config/config');
const bodyParser = require('body-parser');
const store = require('./middleware/authentication_middleware');
const flash = require('connect-flash');
const crypto = require('crypto');
const cors = require('cors')

// generate random secure sessionID using crypto
generateRandomSessionId = () => {
  return crypto.randomBytes(16).toString('hex');
}


// initialize express
const app = express()

// app port
const port = config.app.port

//This example demonstrates adding a generic JSON and URL-encoded parser as a top-level middleware, 
// which will parse the bodies of all incoming requests. 
// This is the simplest setup.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// initialize flash middleware
app.use(flash());
app.use(cors());

//Configure session middleware
app.use(session({
    store: store,
    secret: process.env.SECRET_KEY,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
    genid: function(req) {
      return generateRandomSessionId();
    },
    cookie: {
      // if true prevent client side JS from reading the cookie 
      // Only set to true if your are using HTTPS.
      httpOnly: false,
      // session max age in miliseconds (10 min)
      // Calculates the Expires Set-Cookie attribute
      maxAge: 1000 * 60 * 10,
      // Only set to true if you are using HTTPS.
      // i.e., HTTPS is necessary for secure cookies. If secure is set, and you access your site over HTTP, 
      // the cookie will not be set.
      secure: false
    }
  }));


// app.use(function(req, res, next) {
// res.locals.success_messages = req.flash('success');
// res.locals.error_messages = req.flash('error');
// next();
// });


// use static files: css, js, img
app.use(express.static('public'));

// set view
app.set('views', './views')
app.set('view engine', 'ejs')

// import your routes here
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/user'));
app.use('/', require('./routes/post'));
app.use('/', require('./routes/home'));

// Listen to port
app.listen(port, () => console.info(`web blog app listening on port ${port}`))