const router = require('express').Router();
const cards = require('./cards');
const users = require('./users');
const signin = require('./signin');
const signup = require('./signup');
const authorized = require('../middleware/auth');
const NotFoundError = require('../middleware/errors/NotFoundError');
// USE .ALL - POST/GET SHOULD BE INSIDE
router.all('/cards*', authorized, cards);
router.all('/users*', authorized, users);

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

router.all('/signin', signin);
router.all('/signup', signup);
router.get('/test', (req, res) => {
  res.send('server work');
});

router.all('*', () => {
  throw new NotFoundError('Page not found');
});

module.exports = router;
