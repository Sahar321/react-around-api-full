/*eslint-disable*/
require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors')
const router = require("./routes/router");
const app = express();

const { PORT = 3000 } = process.env;
mongoose.connect("mongodb://localhost:27017/aroundb");

/* app.use((req, res, next) => {
  req.user = {
    _id: "62ba2e4ba4013c4c2ba42e7a",
  };
  next();
}); */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(router);

app.listen(PORT, () => {});
