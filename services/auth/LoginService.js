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

      if (!user || !(await this.comparePasswords(password, user.password))) {
        throw new Error("Invalid credentials");
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
