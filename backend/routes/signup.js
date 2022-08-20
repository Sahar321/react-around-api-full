/*eslint-disable*/
const router = require("express").Router();
const { createNewUser } = require("../controllers/users");
const { celebrate, Joi } = require('celebrate');

const registerValidationSchema = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
  }).unknown(true)});



router.post("/signup", registerValidationSchema, createNewUser);
module.exports = router;
