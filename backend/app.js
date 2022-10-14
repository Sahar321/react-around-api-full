require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const router = require('./routes/router');

const app = express();
const { requestLogger, errorLogger } = require('./middleware/logger');
// settings
const { PORT = 3000 } = process.env;
const handleMainError = (err, req, res, next) => {
  const { statusCode, code } = err;
  const errorInfoToClient = {
    statusCode: 409,
    error: 'email is already exists',
    showError: true,
  };

  switch (statusCode) {
    case 400:
      res.status(statusCode).send(err);
      break;
    case 403:
      res.status(statusCode).send(err);
      break;
    case 404:
      res.status(statusCode).send(err);
      break;
    default:
      break;
  }

  switch (code) {
    case 11000:
      res.status(errorInfoToClient.statusCode).send(errorInfoToClient);
      break;
    default:
      break;
  }
};

/// Middleware's
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.options('*', cors());

// app middleware
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(handleMainError);

// database
mongoose.connect('mongodb://localhost:27017/aroundb');

// Server
app.listen(PORT);
