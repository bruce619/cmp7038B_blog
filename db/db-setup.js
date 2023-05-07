const knex = require('knex');
const knexConfig  = require('../config/knexfile');
const { Model } = require('objection');
const config = require('../config/config');

environment = config.app.environment

function setupDB() {
    // use the development env
    const db = knex(knexConfig[environment])
    Model.knex(db);    
}


module.exports = setupDB;