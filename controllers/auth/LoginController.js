class LoginController {
  constructor(loginService) {
    this.loginService = loginService;
    this.login = this.login.bind(this);
  }

  async login(req, res) {
    try {
      const userDetails = await this.loginService.login(req.body);

      return res.status(201).json({ userDetails });
    } catch (err) {
      console.log(err);
      if (err.message == "Invalid credentials") {
        return res
          .status(401)
          .send(
            "There was a problem logging in. Check your email and password or create an account."
          );
      } else {
        return res
          .status(500)
          .send(
            "Something went wrong while logging in. Please try again later."
          );
      }
    }
  }
}

module.exports = LoginController;
