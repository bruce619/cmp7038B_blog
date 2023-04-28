const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);


// configure redis client
const redisClient = redis.createClient({
    host: "localhost",
    port: 6379
})

redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});

const store = new RedisStore({
    client: redisClient
})


module.exports = store;
