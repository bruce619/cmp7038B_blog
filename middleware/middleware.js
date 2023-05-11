const session = require('express-session');
const Redis = require('ioredis');
const RedisStore = require('connect-redis')(session);
const multer = require('multer');

// redis store middleware
const redisClient = new Redis();

const store = new RedisStore({client: redisClient});

// multer for upload middleware
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        const unique_suffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + unique_suffix + '.' + file.originalname.split('.').pop());
    }
});


const file_upload = multer({storage: storage});

module.exports = {
    store,
    file_upload
}
