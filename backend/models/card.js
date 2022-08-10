const mongoose = require('mongoose');

const imagePatren = /(https?:\/\/.*\.(?:png|jpg|gif|jpeg))/;

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return imagePatren.test(v);
      },
    },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user', default: [] }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
