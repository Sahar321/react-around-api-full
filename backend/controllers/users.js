/*eslint-disable*/
/* eslint-disable no-underscore-dangle */
const User = require("../models/user");
const { mongodbError } = require("../utils/mongodbError");
const bycript = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getUserByID = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const err = new Error("DocumentNotFoundError");
      err.name = "DocumentNotFoundError";
      throw err;
    })
    .then((user) => res.send(user))
    .catch((err) => mongodbError(res, err, "user"));
};

const getAllUsers = (req, res) => {
  User.find({})
    .orFail(() => {
      const err = new Error("DocumentNotFoundError");
      err.name = "DocumentNotFoundError";
      throw err;
    })
    .then((users) => res.send(users))
    .catch((err) => mongodbError(res, err, "users"));
};

const createNewUser = (req, res) => {
  const { email, password, name, about, avatar } = req.body;
  console.log("SDf");
  bycript
    .hash(password, 10)
    .then((hashed) => {
      User.create({ email, password: hashed, name, about, avatar })
        .then((user) => res.send({ _id: user._id, email: user.email }))
        .catch((err) => mongodbError(res, err));
    })
    .catch((err) => {});
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true, upsert: true }
  )
    .then((user) => res.send(user))
    .catch((err) => mongodbError(res, err));
};

const updateProfileAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true, upsert: true }
  )
    .then((user) => res.send(user))
    .catch((err) => mongodbError(res, err));
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      return res.send({ succs: true });
    })
    .catch((err) =>

    {

      mongodbError(res, err)
    });
};

module.exports = {
  getUserByID,
  getAllUsers,
  createNewUser,
  updateProfile,
  updateProfileAvatar,
  login,
};

/*     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    {
      token;
    }
 */