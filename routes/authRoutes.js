const router = require("express").Router();
const joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const authControllers = require("../controllers/authControllers");
const registerSchema = joi.object({
  firstname: joi.string().min(1).max(20).required(),
  lastname: joi.string().min(1).max(20).required(),
  mail: joi.string().email().required(),
  password: joi.string().min(6).max(15).required(),
});

const loingScema = joi.object({
  mail: joi.string().email().required(),
  password: joi.string().min(6).max(15).required(),
});

router.post(
  "/register",
  validator.body(registerSchema),
  authControllers.controllers.postRegister
);

router.post(
  "/login",
  validator.body(loingScema),
  authControllers.controllers.postLogin
);

module.exports = router;
