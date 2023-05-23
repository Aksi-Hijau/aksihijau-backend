const User = require('../models').User;

const findUser = async (query) => {
  return User.findOne({ where: query });
}

const UserService = {
  findUser,
}

module.exports = UserService;