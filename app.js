// imports
const config = require('./config/config');
const express = require('express');
const app = express()
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
app.set('views', './src/views')
app.set('view engine', 'ejs')

// import your routes here
app.use('/', require('./routes/auth'));

// Listen to port
app.listen(port, () => console.info(`web blog app listening on port ${port}`))