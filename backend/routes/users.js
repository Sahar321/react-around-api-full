/*eslint-disable*/
const router = require("express").Router();
const {
  getUserByID,
  getAllUsers,
  updateProfile,
  updateProfileAvatar,
  getUserInfo,
} = require("../controllers/users");
const { celebrate, Joi } = require("celebrate");

const ValidationSchema = {
  updateProfile: celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().required().min(2).max(30),
        about: Joi.string().required().min(2).max(30),
      })
      .unknown(true)
  }),
  updateProfileAvatar: celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string().required().uri(),
      })
      .unknown(true),
  }),
}


// router.get('/users/:userId', getUserByID);
router.get("/users", getAllUsers);
router.get("/users/me", getUserInfo);

router.patch("/users/me", ValidationSchema.updateProfile, updateProfile);
router.patch("/users/me/avatar",ValidationSchema.updateProfileAvatar, updateProfileAvatar);

module.exports = router;
