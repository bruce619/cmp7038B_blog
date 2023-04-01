require('dotenv').config({path: '../.env'});
const config = require('../config/config');

const environment = config.app.environment; // 'development' or 'production'
const conf = require('../config/knexfile')(environment);
module.exports = require('knex')(conf);