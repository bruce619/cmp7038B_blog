const session = require('express-session');
const Redis = require('ioredis');
const RedisStore = require('connect-redis')(session);

// redis store middleware
const redisClient = new Redis();

const store = new RedisStore({client: redisClient});

function loginRequired(req, res, next){
    if (req.session && req.session.userId) {
        // User is authenticated, proceed with the next

        // regenerate csrf token
        res.locals.csrfToken = req.csrfToken()

        return next();
    } else {
        // User is not authenticated
        // redirect to the login page
        res.status(401).redirect('/login');
    }
}

module.exports = {
    store,
    loginRequired
}
