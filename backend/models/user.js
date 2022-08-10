const mongoose = require('mongoose');

const urlPatren = /^http(s)?:\/\/(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  about: {
    type: String, required: true, minlength: 2, maxlength: 20,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlPatren.test(v);
      },
    },
  },
});
module.exports = mongoose.model('user', userSchema);
