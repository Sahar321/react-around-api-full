/*eslint-disable*/

require("dotenv").config();
const fs = require("fs");
const cors = require("cors");
const router = require("./routes/router");
const helmet = require("helmet");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const NotFoundError = require("./middleware/errors/NotFoundError");
const NotAuthorizedError = require("./middleware/errors/NotAuthorizedError");
const InValidRequestError = require("./middleware/errors/InValidRequestError");
const { errors } = require("celebrate");
const app = express();
const { requestLogger, errorLogger } = require("./middleware/logger");
// settings
const { PORT = 3000 } = process.env;
const handleMainError = (err, req, res, next) => {
  const { statusCode, message, showError, code } = err;
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
      {
        error: statusCode === 500
          ? "An error occurred on the server."
          : message;
      }

      break;
  }

  switch (code) {
    case 11000:
      const error = {statusCode: 409, error: "email is already exists",showError: true}
      res.status(error.statusCode).send(error);
      break;
    default:
      {
        error: statusCode === 500
          ? "An error occurred on the server."
          : message;
      }

      break;
  }
};

/// Middleware's
//3rd party middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.options("*", cors());

// app middleware
app.use(requestLogger);

app.use(router);

app.use(errorLogger); // enabling the error logger

app.use(errors());
app.use(handleMainError);

mongoose.connect("mongodb://localhost:27017/aroundb");

app.listen(PORT);
