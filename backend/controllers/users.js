/* eslint-disable no-underscore-dangle */
const User = require('../models/user');
const { mongodbError } = require('../utils/mongodbError');

const getUserByID = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const err = new Error('DocumentNotFoundError');
      err.name = 'DocumentNotFoundError';
      throw err;
    })
    .then((user) => res.send(user))
    .catch((err) => mongodbError(res, err, 'user'));
};

const getAllUsers = (req, res) => {
  User.find({})
    .orFail(() => {
      const err = new Error('DocumentNotFoundError');
      err.name = 'DocumentNotFoundError';
      throw err;
    })
    .then((users) => res.send(users))
    .catch((err) => mongodbError(res, err, 'users'));
};

const createNewUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => mongodbError(res, err));
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true, upsert: true },
  )
    .then((user) => res.send(user))
    .catch((err) => mongodbError(res, err));
};

const updateProfileAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true, upsert: true },
  )
    .then((user) => res.send(user))
    .catch((err) => mongodbError(res, err));
};

module.exports = {
  getUserByID,
  getAllUsers,
  createNewUser,
  updateProfile,
  updateProfileAvatar,
};
