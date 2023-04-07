// User controller handles users information and profile

const setupDB = require('../db/db-setup');
const User = require('../models/user');

setupDB();

// GET: all regsitered users view
exports.getUsers = async (req, res) => {

    try {

        const users = await User.query()
        res.json(users);

    } catch (err) {
        console.error(err);
        res.status(500).json(err)
    }
    
}
