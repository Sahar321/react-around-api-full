require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { errors, isCelebrateError } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const router = require('./routes/router');
const TooManyRequestsError = require('./middleware/errors/TooManyRequestsError');

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
const { requestLogger, errorLogger } = require('./middleware/logger');
// settings
const { PORT = 3001 } = process.env;
const handleMainError = (err, req, res, next) => {
  // if an error has no status, display 500
  let { statusCode = 500 } = err;
  const { message } = err;
  // change status code if is CelebrateError, otherwise
  // it will send the default error message
  if (isCelebrateError(err)) {
    statusCode = 400;
  }

  res.status(statusCode).send({
    message: statusCode === 500 ? 'An error occurred on the server' : message,
  });
};

/// Middleware's

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.options('*', cors());
app.use(limiter);
// app middleware
app.use(errors());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);

app.use(handleMainError);

// database
mongoose.connect('mongodb://localhost:27017/aroundb');

// Server
app.listen(PORT);
