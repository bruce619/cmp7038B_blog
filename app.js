// imports
const config = require('./config');
const express = require('express')
const app = express()
const port = config.app.port

// Listen to port
app.listen(port, () => console.info(`hotel booking app listening on port ${port}`))