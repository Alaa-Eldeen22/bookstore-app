const router = require("express").Router();
const joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const authControllers = require("../controllers/auth/authControllers");
const registerSchema = require("../validation/schemas/registerValidation");
const loginSchema = require("../validation/schemas/loginValidation");

router.post(
  "/register",
  validator.body(registerSchema),
  authControllers.controllers.postRegister
);

router.post(
  "/login",
  validator.body(loginSchema),
  authControllers.controllers.postLogin
);

module.exports = router;
