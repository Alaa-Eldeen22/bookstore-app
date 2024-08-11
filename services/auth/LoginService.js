class LoginService {
  constructor(comparePasswords, generateToken, UserModel, tokenKey) {
    this.UserModel = UserModel;
    this.comparePasswords = comparePasswords;
    this.generateToken = generateToken;
    this.tokenKey = tokenKey;
    this.login = this.login.bind(this);
  }

  async login({ mail, password }) {
    try {
      const user = await this.UserModel.findOne({ mail: mail.toLowerCase() });

      if (!user || !(await this.compareSPasswords(password, user.password))) {
        const error = new Error(
          "There was a problem logging in. Check your email and password or create an account."
        );
        error.statusCode = 401;
        throw error;
      }

      const token = this.generateToken(user, this.tokenKey);

      return {
        id: user._id,
        token,
        role: user.role,
      };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = LoginService;
