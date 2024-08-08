class RegisterService {
  constructor(encryptPassword, generateToken, UserModel, tokenKey) {
    this.encryptPassword = encryptPassword;
    this.generateToken = generateToken;
    this.UserModel = UserModel;
    this.tokenKey = tokenKey;
  }
  async register({ firstname, lastname, mail, password, role }) {
    try {
      const userExist = await this.UserModel.exists({
        mail: mail.toLowerCase(),
      });
      if (userExist) {
        throw new Error("Email already used");
      }

      const encryptedPassword = await this.encryptPassword(password);
      const user = await this.UserModel.create({
        firstname,
        lastname,
        mail: mail.toLowerCase(),
        password: encryptedPassword,
        role,
      });

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

module.exports = RegisterService;
