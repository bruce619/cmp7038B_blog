// imports
const config = require('./config/config');
const express = require('express');
const app = express()

//This example demonstrates adding a generic JSON and URL-encoded parser as a top-level middleware, 
// which will parse the bodies of all incoming requests. 
// This is the simplest setup.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app port
const port = config.app.port

// use static files: css, js, img
app.use(express.static('/src/public/assets'));

// css
app.use('/css', express.static(__dirname + '/public/css'));
// js
app.use('/js', express.static(__dirname + '/public/js'));
// img
app.use('/img', express.static(__dirname + '/public/img'));

// set view
app.set('views', './views')
app.set('view engine', 'ejs')

// import your routes here
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/user'));

// Listen to port
app.listen(port, () => console.info(`web blog app listening on port ${port}`))