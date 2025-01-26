const AuthService = require("../services/AuthService");

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  /**
   * Handles user login.
   * @route POST /auth/login
   * @access Public
   */
  login = async (req, res, next) => {
    try {
      const userDetails = await this.authService.login(req.body);
      res.status(200).json({ userDetails });
    } catch (err) {
      console.error("Error during login:", err);
      next(err);
    }
  };

  /**
   * Handles user registration.
   * @route POST /auth/register
   * @access Public
   */
  register = async (req, res, next) => {
    try {
      const userDetails = await this.authService.register(req.body);
      res.status(201).json({ userDetails });
    } catch (err) {
      console.error("Error during registration:", err);
      next(err);
    }
  };
}

module.exports = AuthController;
