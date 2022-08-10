const router = require('express').Router();
const cards = require('./cards');
const users = require('./users');

// USE .ALL - POST/GET SHOULD BE INSIDE
router.all('/cards*', cards);
router.all('/users*', users);

router.all('*', (req, res) => {
  res.status(404).json({ message: 'Requested resource not found' });
});

module.exports = router;
