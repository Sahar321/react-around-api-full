/* eslint-disable no-underscore-dangle */

const Card = require('../models/card');
const { mongodbError } = require('../utils/mongodbError');

const getAllCards = (req, res) => {
  Card.find({})
    .orFail(() => {
      const err = new Error('DocumentNotFoundError');
      err.name = 'DocumentNotFoundError';
      throw err;
    })
    .then((cards) => res.send(cards))
    .catch((err) => mongodbError(res, err, 'cards'));
};
const createNewCard = (req, res) => {
  const { name, link, createdAt } = req.body;
  const owner = req.user._id;
  const likes = req.user._id;
  Card.create({
    name,
    link,
    owner,
    likes,
    createdAt,
  })
    .then((card) => res.send(card))
    .catch((err) => mongodbError(res, err, 'card'));
};
const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      const err = new Error('DocumentNotFoundError');
      err.name = 'DocumentNotFoundError';
      throw err;
    })
    .then((card) => res.send(card))
    .catch((err) => mongodbError(res, err, 'card'));
};

const unLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const err = new Error('DocumentNotFoundError');
      err.name = 'DocumentNotFoundError';
      throw err;
    })
    .then((card) => res.send(card))
    .catch((err) => mongodbError(res, err));
};
const addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const err = new Error('DocumentNotFoundError');
      err.name = 'DocumentNotFoundError';
      throw err;
    })
    .then((card) => res.send(card))
    .catch((err) => mongodbError(res, err));
};

module.exports = {
  getAllCards,
  createNewCard,
  deleteCardById,
  unLike,
  addLike,
};
