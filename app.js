// imports
const config = require('./config');
const express = require('express')
const app = express()
const port = config.app.port

// use static files: css, js, img
app.use(express.static('/src/public/assets'));

// css
app.use('/css', express.static(__dirname + '/src/public/css'));
// js
app.use('/js', express.static(__dirname + '/src/public/js'));
// img
app.use('/img', express.static(__dirname + '/src/public/img'));

// set view
app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use('/', require('./src/routes/auth'));

// Listen to port
app.listen(port, () => console.info(`hotel booking app listening on port ${port}`))