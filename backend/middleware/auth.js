/* eslint-disable */
module.exports = authorized = (req, res, next) => {
  console.log(req.headers);
  // get authorization from the header by destructuring
  const { authorization } = req.headers;
console.log(process.env.JWT_SECRET);
  // check that the header exists and starts with 'Bearer '
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Authorization required' });
  }

   // auth header exists and is in correct format
   // so extract the token from the header
   const token = authorization.replace('Bearer ', '');

   // if token is verified, save the payload
   let payload;
   try {
     payload = jwt.verify(token, process.env.JWT_SECRET);
   } catch (err) {
     // otherwise, return an error
     return res
      .status(401)
      .send({ message: 'payload:Authorization required' });
   }

   /* Save payload to request. This makes the payload available
   to the latter parts of the route. See the `Accessing user
   data with req.user` example for details. */
   req.user = payload;

   // sending the request to the next middleware
   next();
};
