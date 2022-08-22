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
      })
      .unknown(true),
  }),
  cardId: celebrate({
    body: Joi.object()
      .keys({
        cardId: Joi.string().required(),
      })
      .unknown(true),
  }),
};

router.get("/cards", getAllCards);

router.post("/cards", ValidationSchema.createNewCard, createNewCard);

router.delete("/cards/:cardId", deleteCardById);

router.delete("/cards/likes/:cardId", unLike);

router.put("/cards/likes/:cardId", addLike);

module.exports = router;
