/* eslint-disable */
const { isEmail, isURL } = require("validator");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
  },
  about: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
    },
  },
});
module.exports = mongoose.model("user", userSchema);
