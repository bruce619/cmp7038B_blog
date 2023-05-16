// imports
const express = require('express');
const session = require('express-session');
const config = require('./config/config');
const bodyParser = require('body-parser');
const {store}= require('./middleware/middleware');
const flash = require('connect-flash');
const crypto = require('crypto');
const cors = require('cors')
const multer = require('multer');
const path = require('path')
const csrf = require('csurf')
const cookieParser = require('cookie-parser');

const SECRET = process.env.SECRET_KEY

const csrfProtection = csrf({cookie: true, secret: SECRET, maxAge: 4 * 60 * 1000});

// file upload storage with multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
      const unique_suffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + unique_suffix + '.' + file.originalname.split('.').pop());
  }
});

const file_upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb){
      const validFileExtentions = [".jpg", ".png", ".jpeg"]
      const ext_ = path.extname(file.originalname);
      if (!validFileExtentions.includes(ext_)){
          return cb(new Error("Invalid file. Please select either .jpg, .png, or .jpeg"))
      }
      cb(null, true)
  },
  limits: {fileSize: 125000 * 10}, // 10mb
});

// generate random secure sessionID using crypto
generateRandomSessionId = () => {
  return crypto.randomBytes(16).toString('hex');
}

// this middleware creates the CSRF Token on GET request
function createCsrfToken(req, res, next){
  if (req.method === 'GET'){
      res.locals.csrfToken = req.csrfToken();
  }
  next();
}

// this middleware checks the CSRF Token on POST request
function checkCsrfToken(req, res, next){
  if (req.method === 'POST'){
    csrfProtection(req, res, next)
  }else{
    next()
  }
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

// set CORS Origin
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));

app.use(cookieParser())

//Configure session middleware
app.use(session({
    store: store,
    secret: SECRET,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists

    name: "cs", // name of the session ID cookie to set in the response. Don't use the default 'sid'

    // Function to generate a new session ID. 
    // Provide a function that returns a string that will be used as a session ID.
    genid: function(req) {
      return generateRandomSessionId();
    },

    cookie: {

      // secure: Only set to true in production with SSL enabled
      // i.e., HTTPS is necessary for secure cookies. If secure is set, and you access your site over HTTP, 
      // the cookie will not be set.
      secure: false,

      // httpOny: if true prevent client side JS from reading the cookie 
      // Only set to true if your are using HTTPS.
      httpOnly: false,

      // session time out: session max age in miliseconds (10 min)
      // Calculates the Expires Set-Cookie attribute
      maxAge: 1000 * 60 * 10,

    }
  }));

// initialize flash middleware
app.use(flash());
// initialize multer middleware
app.use(file_upload.single("profile_picture"));
// custom csrf protection middleware
app.use(csrfProtection)
app.use(createCsrfToken);
app.use(checkCsrfToken);

// error handler for csrf token
app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)
  // handle CSRF token errors here
  res.status(403).send("Session has exired or form tampered with")
})

app.use(function(req, res, next) {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.info = req.flash('info');
  next();
});


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
app.use('/', require('./routes/otp'));


// Listen to port
app.listen(port, () => console.info(`web blog app listening on port ${port}`))


module.exports.server = app;