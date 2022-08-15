/*eslint-disable*/
const router = require("express").Router();
const { createNewUser } = require("../controllers/users");

router.post("/signup", createNewUser);
module.exports = router;
