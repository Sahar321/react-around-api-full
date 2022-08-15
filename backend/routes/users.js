const router = require('express').Router();
const {
  getUserByID,
  getAllUsers,
  createNewUser,
  updateProfile,
  updateProfileAvatar,
} = require('../controllers/users');

router.get('/users/:userId', getUserByID);
router.get('/users', getAllUsers);

// router.post('/users', createNewUser);
router.post('/users', createNewUser);

router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateProfileAvatar);

module.exports = router;
