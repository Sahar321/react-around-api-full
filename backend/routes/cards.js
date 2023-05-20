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
        link: Joi.string()
          .required()
          .regex(/\.(jpg|jpeg|png|gif)$/i)
          .messages({
            "string.pattern.base":
              "Please ensure that the URL provided for the image is a valid image URL ending with .jpg, .jpeg, .png, or .gif extensions.",
          }),
      })
      .unknown(true),
  }),
  cardId: celebrate({
    params: Joi.object()
      .keys({
        cardId: Joi.string().hex().required(),
      })
      .unknown(true),
  }),
};

router.get("/cards", getAllCards);

router.post("/cards", ValidationSchema.createNewCard, createNewCard);

router.delete("/cards/:cardId", ValidationSchema.cardId, deleteCardById);

router.delete("/cards/:cardId/likes/", ValidationSchema.cardId, unLike);

router.put("/cards/:cardId/likes", addLike);

module.exports = router;
