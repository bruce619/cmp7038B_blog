const session = require('express-session');
const Redis = require('ioredis')
const RedisStore = require('connect-redis')(session);


const redisClient = new Redis();

const store = new RedisStore({client: redisClient});

module.exports = store;
