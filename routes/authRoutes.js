const router = require("express").Router();
const validator = require("express-joi-validation").createValidator({});
const { authController } = require("../config/DIContainer");
const registerSchema = require("../validation/schemas/registerValidation");
const loginSchema = require("../validation/schemas/loginValidation");

// Login route (Public)
router.post("/login", validator.body(loginSchema), authController.login);

// Register route (Public)
router.post(
  "/register",
  validator.body(registerSchema),
  authController.register
);

module.exports = router;
