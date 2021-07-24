const User = require('../models/user.model')

const getUserById = async id => {
    let findUser = new User();
    await User.findById(id)
        .then(user => {
            findUser = user;
        })
    return findUser;
}

module.exports = getUserById;