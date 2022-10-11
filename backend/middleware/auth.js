const jwt = require('jsonwebtoken');
const InValidRequestError = require('./errors/InValidRequestError');

const authorized = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new InValidRequestError();
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new InValidRequestError();
  }
  req.user = payload;
  next();
};
module.exports = authorized;
