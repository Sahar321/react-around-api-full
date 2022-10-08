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
const { errors } = require("celebrate");
const app = express();
const { requestLogger, errorLogger } = require("./middleware/logger");
// settings
const { PORT = 3000 } = process.env;
const handleMainError = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "An error occurred on the server." : message,
  });
};

/// Middleware's
//3rd party middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
res.header("Access-Control-Allow-Origin", "*");
// app middleware
app.use(requestLogger);

app.use(router);

app.use((err, req, res, next) => {
  const { statusCode = 500, message, code } = err;
  switch (true) {
    case message === "Validation failed":
      res.status(400).send({
        message: "Data passed is invalid",
      });
      break;
    case code === 11000: // monogo error code: duplicate:
      const itemExist = Object.keys(err.keyValue)[0];
      res.status(409).send({
        message: `${itemExist} already exist`,
      });
      break;
    default:
      res.status(500).send({
        message: err.stack,
      });
      break;
  }
});
app.use(errorLogger); // enabling the error logger

app.use(errors());
app.use(handleMainError);

mongoose.connect("mongodb://localhost:27017/aroundb");

app.listen(PORT);
