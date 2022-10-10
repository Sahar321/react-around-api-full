/* eslint-disable */
const jwt = require("jsonwebtoken");
const InValidRequestError = require("./errors/InValidRequestError");
module.exports = authorized = (req, res, next) => {

  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new InValidRequestError();
  }

  const token = authorization.replace("Bearer ", "");

  // if token is verified, save the payload
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);

  } catch (err) {
    // otherwise, return an error
    throw new InValidRequestError();
  }

  /* Save payload to request. This makes the payload available
   to the latter parts of the route. See the `Accessing user
   data with req.user` example for details. */
  req.user = payload;

  // sending the request to the next middleware
  next();
};
