class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  // Endpoint accessible by: Public
  login = async (req, res, next) => {
    try {
      const userDetails = await this.authService.login(req.body);
      res.status(200).json({ userDetails });
    } catch (err) {
      console.error("Error logging in:", err);
      next(err);
    }
  };

  // Endpoint accessible by: Public
  register = async (req, res, next) => {
    try {
      const userDetails = await this.authService.register(req.body);
      res.status(201).json({ userDetails });
    } catch (err) {
      console.error("Error registering user:", err);
      next(err);
    }
  };
}

module.exports = AuthController;
