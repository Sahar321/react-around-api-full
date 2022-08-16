/* eslint-disable */
const jwt = require("jsonwebtoken");
module.exports = authorized = (req, res, next) => {

  // get authorization from the header by destructuring
  const { authorization } = req.headers;

  // check that the header exists and starts with 'Bearer '
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'auth:Authorization required' });
  }

   // auth header exists and is in correct format
   // so extract the token from the header
   const token = authorization.replace('Bearer ', '');

   // if token is verified, save the payload
   let payload;
   try {
     payload = jwt.verify(token, process.env.JWT_SECRET);
     console.log('payload',payload);
   } catch (err) {
     // otherwise, return an error
     return res
      .status(401)
      .send({ message: `error:${err}` });
   }

   /* Save payload to request. This makes the payload available
   to the latter parts of the route. See the `Accessing user
   data with req.user` example for details. */
   req.user = payload;

   // sending the request to the next middleware
   next();
};
