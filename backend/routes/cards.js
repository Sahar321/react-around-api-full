const router = require('express').Router();

const {
  getAllCards,
  createNewCard,
  deleteCardById,
  unLike, addLike,
} = require('../controllers/cards');

router.get('/cards', getAllCards);

router.post('/cards', createNewCard);

router.delete('/cards/:cardId', deleteCardById);

router.delete('/cards/:cardId/likes', unLike);

router.put('/cards/:cardId/likes', addLike);
/* PUT /cards/:cardId/likes — like a card
DELETE /cards/:cardId/likes — unlike a card  */

module.exports = router;
