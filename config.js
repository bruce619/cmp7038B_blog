const env = process.env.NODE_ENV || 'dev'; // 'dev' or 'prod'


const dev = { 

    app: {
        port: parseInt(process.env.DEV_APP_PORT) || 3000,
    },

    db: {

        host: process.env.DEV_APP_HOST || 'localhost',
        port : parseInt(process.env.DEV_DB_PORT) || 5432,
        user : process.env.DEV_DB_USER,
        password : process.env.DEV_DB_PASSWORD,
        database : process.env.DEV_DB_DATABASE || 'blog'
    }

};


const prod = { 

    app: {
        port: parseInt(process.env.PROD_APP_PORT) || 3000,
    },

    db: {

        host: process.env.PROD_APP_HOST,
        port : parseInt(process.env.PROD_DB_PORT) || 5432,
        user : process.env.PROD_DB_USER,
        password : process.env.PROD_DB_PASSWORD,
        database : process.env.PROD_DB_DATABASE
    }

};

const config = {
    dev,
    prod 
    }

module.exports = config[env];