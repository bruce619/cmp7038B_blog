require('dotenv').config({path: '../.env'});
const knex = require('knex');
const { Model } = require('objection');
const config = require('../config/config');
const environment = config.app.environment; // 'development' or 'production'
const knexfile = require('../config/knexfile')(environment);

// Give the knex instance to objection.
dbSetUp = () => {
    const db = knex(knexfile);
    Model.knex(db)
};

module.exports = dbSetUp;
