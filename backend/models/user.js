const { isEmail, isURL } = require('validator');
const mongoose = require('mongoose');
const bycript = require('bcryptjs');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validates: {
      validator: (email) => isEmail(email),
      message: 'Invalid email',
    },
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    select: false,
  },
  name: {
    type: String,
    minLength: 2,
    maxLength: 20,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 20,
    default: 'Explorer',
  },
  avatar: {
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    type: String,
    validate: {
      validator: (v) => isURL(v),
    },
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  // we refer to the User model as `this`
  return this.findOne({ email })
    .select('password')
    .then((user) => {
      if (!user) {
        const err = new Error('user not found');
        err.name = 'userNotFound';
        return Promise.reject(err);
      }

      return bycript.compare(password, user.password).then((matched) => {
        if (!matched) {
          const err = new Error('user not found');
          err.name = 'passwordNotMatch';
          return Promise.reject(err);
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
