/*eslint-disable*/
const router = require('express').Router();
const cards = require('./cards');
const users = require('./users');
const signin = require('./signin');
const signup = require('./signup');
const authorized = require('../middleware/auth');
const { celebrate, Joi } = require('celebrate');

// USE .ALL - POST/GET SHOULD BE INSIDE
router.all('/cards*', authorized, cards);
router.all('/users*', authorized,users);

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

router.all('/signin', signin);
router.all('/signup', signup);

router.all('*',(req, res) => {
  res.status(404).json({ message: 'Requested resource not found' });
});

module.exports = router;
