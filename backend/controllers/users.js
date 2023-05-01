/* eslint-disable */
const jwt = require("jsonwebtoken");
const bycript = require("bcryptjs");
const User = require("../models/user");
const NotFoundError = require("../middleware/errors/NotFoundError");
const ConflictError = require("../middleware/errors/ConflictError");
const  defaultJwtSecret  = require("../constant/constant");
const { JWT_SECRET = defaultJwtSecret } = process.env;

const getUserByID = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundError("User not found");
    })
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

const getAllUsers = (req, res, next) => {
  User.find({})
    .orFail(() => {
      throw new NotFoundError("Users are empty");
    })
    .then((users) => res.send(users))
    .catch((err) => next(err));
};

const createNewUser = (req, res, next) => {
  const { email, password, name, about, avatar } = req.body;

  bycript
    .hash(password, 10)
    .then((hashed) => {
      User.create({
        email,
        password: hashed,
        name,
        about,
        avatar,
      })
        .then((user) => {
          res.send({ _id: user._id, email: user.email });
        })
        .catch((err) => {
          next(new ConflictError("email is already exist"));
        });
    })
    .catch((err) => {
      next(err);
    });
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true, upsert: true }
  )
    .orFail(() => {
      throw new NotFoundError("Profile not exist");
    })
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

const updateProfileAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true, upsert: true }
  )
    .orFail(() => {
      throw new NotFoundError("Profile not exist");
    })
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

const getUserInfo = (req, res, next) => {

  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError("User not exist");
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => next(err));
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const jwtToken = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.send({ token: jwtToken });
    })
    .catch((err) => next(err));
};

module.exports = {
  getUserByID,
  getAllUsers,
  createNewUser,
  updateProfile,
  updateProfileAvatar,
  login,
  getUserInfo,
};
