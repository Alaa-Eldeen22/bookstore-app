const { message } = require("../../validation/schemas/bookValidation");

class RegisterController {
  constructor(registerService) {
    this.registerService = registerService;
    this.register = this.register.bind(this);
  }

  async register(req, res) {
    try {
      const userDetails = await this.registerService.register(req.body);
      res.status(201).json({ userDetails });
    } catch (err) {
      console.log(err);
      if (err.message == "Email already used") {
        return res.status(409).json({ message: "Email already used." });
      } else {
        return res
          .status(500)
          .send(
            "Something went wrong while registering. Please try again later."
          );
      }
    }
  }
}

module.exports = RegisterController;
