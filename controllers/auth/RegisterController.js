class RegisterController {
  constructor(registerService) {
    this.registerService = registerService;
    this.register = this.register.bind(this);
  }

  async register(req, res, next) {
    try {
      const userDetails = await this.registerService.register(req.body);
      res.status(201).json({ userDetails });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = RegisterController;
