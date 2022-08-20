/*eslint-disable*/
const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const {
  getAllCards,
  createNewCard,
  deleteCardById,
  unLike,
  addLike,
} = require("../controllers/cards");

const ValidationSchema = {
  createNewCard: celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().required().min(2).max(30),
        link: Joi.string().required().uri(),
        owner: Joi.string().required(),
        likes: Joi.required(),
        createdAt: Joi.required(),
      })
      .unknown(true),
  }),
  cardId: celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string().required(),
      })
      .unknown(true),
  }),
};

router.get("/cards", getAllCards);

router.post("/cards", ValidationSchema.createNewCard, createNewCard);

router.delete("/cards/:cardId", ValidationSchema.cardId, deleteCardById);

router.delete("/cards/:cardId/likes", ValidationSchema.cardId, unLike);

router.put("/cards/:cardId/likes", ValidationSchema.cardId, addLike);

module.exports = router;
