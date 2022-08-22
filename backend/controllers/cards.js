/* eslint-disable */
// no-underscore-dangle
const Card = require("../models/card");
const mongodbError = require("../middleware/errors/mongodbError");
const NotFoundError = require("../middleware/errors/NotFoundError");
const ObjectId = require("mongodb").ObjectId;
const getAllCards = (req, res) => {
  Card.find({})
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((cards) => res.send(cards))
    .catch((err) => mongodbError(res, err, "cards"));
};
const createNewCard = (req, res) => {
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
    .catch((err) => mongodbError(res, err, "card"));
};
const deleteCardById = (req, res) => {
  Card.findOneAndRemove({
    _id: ObjectId(req.params.cardId),
    owner: ObjectId(req.user._id),
  })
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((card) => res.send(card))
    .catch((err) => mongodbError(res, err, "card"));
};

const unLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((card) => res.send(card))
    .catch((err) => mongodbError(res, err));
};
const addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError();
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
