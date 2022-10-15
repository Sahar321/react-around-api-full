const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllUsers,
  updateProfile,
  updateProfileAvatar,
  getUserInfo,
  getUserByID,
} = require('../controllers/users');

const ValidationSchema = {
  updateProfile: celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().required().min(2).max(30),
        about: Joi.string().required().min(2).max(30),
      })
      .unknown(true),
  }),
  updateProfileAvatar: celebrate({
    body: Joi.object()
      .keys({
        avatar: Joi.string().required().uri(),
      })
      .unknown(true),
  }),
  userId: celebrate({
    params: Joi.object()
      .keys({
        userId: Joi.string().hex().required(),
      })
      .unknown(true),
  }),
};


router.get('/users', getAllUsers);
router.get('/users/me', getUserInfo);
router.get('/users/:userId', ValidationSchema.userId, getUserByID);

router.patch('/users/me', ValidationSchema.updateProfile, updateProfile);
router.patch('/users/me/avatar', ValidationSchema.updateProfileAvatar, updateProfileAvatar);

module.exports = router;
