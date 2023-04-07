const knex = require('knex');
const knexConfig  = require('../config/knexfile');
const { Model } = require('objection');

function setupDB() {
    // use the development env
    const db = knex(knexConfig.development)
    Model.knex(db);    
}


module.exports = setupDB;