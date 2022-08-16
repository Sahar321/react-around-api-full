/*eslint-disable*/
const router = require('express').Router();
const cards = require('./cards');
const users = require('./users');
const signin = require('./signin');
const signup = require('./signup');
const authorized = require('../middleware/auth');
// USE .ALL - POST/GET SHOULD BE INSIDE
router.all('/cards*', authorized, cards);
router.all('/users*', authorized,users);

router.post('/signin', signin);
router.post('/signup', signup);

router.all('*',(req, res) => {
  res.status(404).json({ message: 'Requested resource not found' });
});

module.exports = router;
