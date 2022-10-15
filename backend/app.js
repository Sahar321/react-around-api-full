require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { errors } = require("celebrate");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const router = require("./routes/router");
const rateLimit = require("express-rate-limit");
const TooManyRequestsError = require("./middleware/errors/TooManyRequestsError");

// Apply the rate limiting middleware to all requests

const app = express();
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: () => {
    throw new TooManyRequestsError();
  },
});
const { requestLogger, errorLogger } = require("./middleware/logger");
// settings
const { PORT = 3000 } = process.env;
const handleMainError = (err, req, res, next) => {
  const { statusCode, code, message, details, errors } = err;
  let { errorMessage = message, httpErrorCode = statusCode } = err;
  //check for celebrate error
  details?.forEach((errors) => {
    errors.details.forEach((error) => {
      errorMessage = `${error.message}\n`;
    });
    httpErrorCode = 400;
  });

if (errors){
  for (const [key, value] of Object.entries(errors)) {
    errorMessage = `${key}: ${value}\n`
  }
  httpErrorCode = 400;
}
  //check for mongo  error
  switch (code) {
    case 11000:
      errorMessage = "email not exist";
      httpErrorCode = 404;
      break;
    default:
      break;
  }

  // if error empty, send default server error
  if (!httpErrorCode) {
    httpErrorCode = 500;
    errorMessage = "An error has occurred on the server";
  }

  res.status(httpErrorCode).send({ message: errorMessage });
};

/// Middleware's

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.options("*", cors());
app.use(limiter);
// app middleware
app.use(errors());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);

app.use(handleMainError);

// database
mongoose.connect("mongodb://localhost:27017/aroundb");

// Server
app.listen(PORT);
