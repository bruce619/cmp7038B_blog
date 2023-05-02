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

// GET: a user by id
exports.getUser = async (req, res) => {

    try {
        const { id } = req.params; // get the user ID from the request params
        const user = await User.query().findById(id); // query the User model to find the user by ID
        if (user) {
          res.json(user); // if the user is found, return it as a JSON response
        } else {
          res.status(404).json({ message: 'User not found' }); // if the user is not found, return a 404 error
        }
      } catch (err) {
        res.status(500).json({ message: `Internal server error ${err}` }); // handle any errors
    }

}


exports.profileView = async (req, res) => {
  res.render('profile');
}
