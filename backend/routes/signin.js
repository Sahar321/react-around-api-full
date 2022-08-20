/*eslint-disable*/
const router = require("express").Router();
const { login } = require("../controllers/users");

const { celebrate, Joi } = require("celebrate");

const LoginValidationSchema = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    })
    .unknown(true),
});

router.post("/signin", LoginValidationSchema, login);
module.exports = router;
