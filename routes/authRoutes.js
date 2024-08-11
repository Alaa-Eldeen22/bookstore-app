const router = require("express").Router();
const validator = require("express-joi-validation").createValidator({});
const registerSchema = require("../validation/schemas/registerValidation");
const loginSchema = require("../validation/schemas/loginValidation");
const loginController = require("../config/DIContainer").loginController;
const registerController = require("../config/DIContainer").registerController;

router.post(
  "/login",

  validator.body(loginSchema),

  loginController.login
);

router.post(
  "/register",

  validator.body(registerSchema),

  registerController.register
);

module.exports = router;
