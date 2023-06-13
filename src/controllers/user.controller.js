const StorageService = require('../services/storage.service.js');
const UserService = require('../services/user.service.js');
const createApiResponse = require('../utils/createApiResponse.js');

const User = require('../models').User;

const createUserHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ where: { email } });

    if (userExist) {
      return res.status(409).send(createApiResponse(false, null, { email: "Email already exist!" }));
    }

    const user = await User.create({ name, email, password });
    
    return res.status(201).send(createApiResponse(true, user, null));
  } catch (error) {
    return res.status(500).send(createApiResponse(false, null, error.message));
  }
}

const getUserHandler = async (req, res) => {
  try {
    const user = res.locals.user;

    return res.status(200).send(createApiResponse(true, user, null));
  } catch (error) {
    return res.status(500).send(createApiResponse(false, null, error.message));
  }
}

const updateUserHandler = async (req, res) => {
  try {
    const user = res.locals.user;
    const { name, birthDate } = req.body;

    let photo = user.photo;

    if (req.file) {
      const validImageFormats = ["image/jpg", "image/jpeg", "image/png"];

      if (!validImageFormats.includes(req.file.mimetype)) {
        return res.status(400).send(createApiResponse(false, null, { photo: "Invalid image format!" }));
      }

      photo = StorageService.uploadFile(req.file, "user");
    }

    const updatedUser = await UserService.updateById(user.id, { name, birthDate, photo })

    return res.status(200).send(createApiResponse(true, updatedUser, null));
  } catch (error) {
    return res.status(500).send(createApiResponse(false, null, error.message));
  }
}

const getAllUsersHandler = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();

    const updatedUsers = users.map(user => {
      return {
        id: user.uuid,
        name: user.name,
        email: user.email,
        photo: user.photo,
        role: user.role,
        birthDate: user.birthDate ? user.birthDate.toISOString().split('T')[0] : null,
      }
    })

    return res.status(200).send(createApiResponse(true, updatedUsers, null));
  } catch (error) {
    return res.status(500).send(createApiResponse(false, null, error.message))
  }
}

const UserController = {
  createUserHandler,
  getUserHandler,
  updateUserHandler,
  getAllUsersHandler
};

module.exports = UserController;