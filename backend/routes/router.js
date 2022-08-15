const router = require('express').Router();
const cards = require('./cards');
const users = require('./users');
const signin = require('./signin');
// USE .ALL - POST/GET SHOULD BE INSIDE
router.all('/cards*', cards);
router.all('/users*', users);

router.post('/signin', signin);
// router.post('/signup', createUser);

router.all('*', (req, res) => {
  res.status(404).json({ message: 'Requested resource not found' });
});

module.exports = router;
