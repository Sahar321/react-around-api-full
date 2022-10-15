/*  eslint no-underscore-dangle: ['error', { 'allow': ['_id'] }] */
const { ObjectId } = require('mongodb');
const Card = require('../models/card');
const NotFoundError = require('../middleware/errors/NotFoundError');
const ForbiddenError = require('../middleware/errors/ForbiddenError')
const getAllCards = (req, res, next) => {
  Card.find({})
    .orFail(() => {
      throw new NotFoundError('Cards Are Empty');
    })
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      next(err);
    });
};
const createNewCard = (req, res, next) => {
  const { name, link, createdAt } = req.body;
  const owner = req.user._id;
  const likes = [];
  Card.create({
    name,
    link,
    owner,
    likes,
    createdAt,
  })
    .then((card) => res.send(card))
    .catch((err) => next(err));
};
const deleteCardById = (req, res, next) => {
  Card.findOneAndRemove({
    _id: ObjectId(req.params.cardId),
    owner: ObjectId(req.user._id),
  })
    .orFail(() => {
      throw new ForbiddenError("You do not have permissions to delete this card");
    })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      next(err);
    });
};

const unLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Card not found');
    })
    .then((card) => res.send(card))
    .catch((err) => next(err));
};
const addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Card not found');
    })
    .then((card) => res.send(card))
    .catch((err) => next(err));
};

module.exports = {
  getAllCards,
  createNewCard,
  deleteCardById,
  unLike,
  addLike,
};
