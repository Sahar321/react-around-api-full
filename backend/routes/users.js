/*eslint-disable*/
const router = require('express').Router();
const {
  getUserByID,
  getAllUsers,
  updateProfile,
  updateProfileAvatar,
  getUserInfo,
} = require('../controllers/users');

// router.get('/users/:userId', getUserByID);
router.get('/users', getAllUsers);
router.get('/users/me', getUserInfo);

router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateProfileAvatar);

module.exports = router;
