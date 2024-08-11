class LoginController {
  constructor(loginService) {
    this.loginService = loginService;
    this.login = this.login.bind(this);
  }

  async login(req, res, next) {
    try {
      const userDetails = await this.loginService.login(req.body);

      return res.status(201).json({ userDetails });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = LoginController;
